import fetch from 'node-fetch';

export const searchForIssuesUsingJQL = (jiraEmail, jiraToken) => {
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
