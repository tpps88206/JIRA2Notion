export const addIssue = (
  notion: any,
  notionDatabaseId: string,
  isDone: boolean,
  status: string,
  summary: string,
  jiraKey: string,
  jiraLink: string,
) => {
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

export const updateIssue = (notion: any, notionPageId: string, isDone: boolean, status: string) => {
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

export const queryIssues = async (notion: any, notionDatabaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
