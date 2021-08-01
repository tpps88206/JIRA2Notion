import fetch from 'node-fetch';

import { JiraSearchForIssuesResponse } from '../types/jira';

export const searchForIssuesUsingJQL: (jiraEmail: string, jiraToken: string) => Promise<JiraSearchForIssuesResponse> = (
  jiraEmail,
  jiraToken,
) => {
  // JQL: project = APP AND assignee IN (currentUser()) AND updated >= -12h ORDER BY created DESC
  return fetch(
    'https://17media.atlassian.net/rest/api/3/search?jql=project%20%3D%20%22APP%22%20AND%20assignee%20IN%20%28currentUser%28%29%29%20AND%20updated%20%3E%3D%20-12h%20ORDER%20BY%20created%20DESC',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64')}`,
        Accept: 'application/json',
      },
    },
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.error(error));
};
