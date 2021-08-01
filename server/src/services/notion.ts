import { NotionQueryIssuesResponse } from '../types/notion';

export const addIssue: (
  notion: any,
  notionDatabaseId: string,
  isDone: boolean,
  status: string,
  summary: string,
  jiraKey: string,
  jiraLink: string,
) => void = (notion, notionDatabaseId, isDone, status, summary, jiraKey, jiraLink) => {
  try {
    notion.pages.create({
      parent: { database_id: notionDatabaseId },
      properties: {
        Done: {
          type: 'checkbox',
          checkbox: isDone,
        },
        Status: {
          select: { name: status },
        },
        Name: {
          title: [
            {
              type: 'text',
              text: {
                content: summary,
              },
            },
          ],
        },
        'JIRA Key': {
          rich_text: [
            {
              type: 'text',
              text: {
                content: jiraKey,
              },
            },
          ],
        },
        'JIRA Link': {
          url: jiraLink,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateIssue: (notion: any, notionPageId: string, isDone: boolean, status: string) => void = (
  notion,
  notionPageId,
  isDone,
  status,
) => {
  try {
    notion.pages.update({
      page_id: notionPageId,
      properties: {
        Done: {
          type: 'checkbox',
          checkbox: isDone,
        },
        Status: {
          select: { name: status },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const queryIssues: (notion: any, notionDatabaseId: string) => Promise<NotionQueryIssuesResponse> = async (
  notion,
  notionDatabaseId,
) => {
  try {
    return await notion.databases.query({
      database_id: notionDatabaseId,
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
