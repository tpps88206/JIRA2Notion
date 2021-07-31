import { Client } from '@notionhq/client';

import { searchForIssuesUsingJQL } from './services/jira';
import Firestore from './services/firestore';
import { addIssue, queryIssues, updateIssue } from './services/notion';

const run = async () => {
  await Firestore.init();

  try {
    for (const user of Firestore.Users) {
      // Get JIRA issues with JQL
      const jiraData = await searchForIssuesUsingJQL(user.jiraEmail, user.jiraToken);
      if (!jiraData.issues || !Array.isArray(jiraData.issues)) {
        console.log('No ticket need to update in JIRA.');
        return;
      }

      // Get Notion issues
      const notion = new Client({ auth: user.notionToken });
      const notionData = await queryIssues(notion, user.notionDatabaseId);
      if (!notionData.results || !Array.isArray(notionData.results)) {
        console.log('The Notion result is empty.');
        return;
      }

      let needAddItems: any = [];
      let needUpdateItems: any = [];

      for (const issue of jiraData.issues) {
        let isExist = false;
        notionData.results.forEach((notionIssue: any) => {
          // Check whether the current JIRA issue already exists in Notion
          if (notionIssue.properties['JIRA Key']?.rich_text[0]?.text?.content === issue.key) {
            isExist = true;

            // Check whether the current status of JIRA issue already equals in Notion
            if (notionIssue.properties['Status']?.select?.name !== issue.fields.status.name) {
              // If the status is not equal, then push the issue into needUpdateItems array
              needUpdateItems.push({ notionPageId: notionIssue.id, ...issue });
            }
          }
        });

        if (!isExist) {
          // If the issue is not exist in Notion, then push the issue into needAddItems array
          needAddItems.push(issue);
        }
      }

      // Start add new issue into Notion
      for (const issue of needAddItems) {
        addIssue(
          notion,
          user.notionDatabaseId,
          issue.fields.status.name === 'Done',
          issue.fields.status.name,
          issue.fields.summary,
          issue.key,
          `https://17media.atlassian.net/browse/${issue.key}`,
        );
      }

      // Start update new issue into Notion
      for (const issue of needUpdateItems) {
        updateIssue(notion, issue.notionPageId, issue.fields.status.name === 'Done', issue.fields.status.name);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

run();
