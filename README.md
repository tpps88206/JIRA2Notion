<img align="left" width="100" height="100" src="./docs/logo.png">

# JIRA2Notion

A small Node app to create or update Notion pages from Jira issues.

![flow.png](./docs/flow.png)

## 🚀 Features
- ✅ Import issues from JIRA into Notion regularly
    - Regularly time: Every hour from 09:00 through 21:00 on every day-of-week from Monday through Friday.
    - Condition: Has been updated in the past 12 hours and is the current user’s issue.
- ✅ Check whether the issue already exists in Notion to avoid repeated import.
- ✅ Check whether the issue status of the existing Notion is the same as the status in JIRA, and update it.
- ✅ Use [Firestore](https://firebase.google.com/docs/firestore) to save all sensitive data.

## 📝 Prerequisite

If you did not serve your own server, you do not need to create Firestore database.

**Just follow step 1 and 2, generate your JIRA and Notion token.**

And give your token to somebody who serves the server and Firestore database.


### 1. Generate JIRA token

We need JIRA token to access your JIRA data without user ID and password.

- 1. Login and go to [Atlassian manage profile](https://id.atlassian.com/manage-profile/security/api-tokens). Click create API token.
    ![jira01.png](./docs/jira01.png)
     
- 2. Copy your JIRA token.
    ![jira02.png](./docs/jira02.png)

### 2. Generate Notion token and setup page

We need Notion token to access your Notion database.

- 1. Login and go to [Notion integrations page](https://www.notion.so/my-integrations). Click create new integration.
     ![notion01.png](./docs/notion01.png)

- 2. Copy your Notion token.
     ![notion02.gif](./docs/notion02.gif)
     
- 3. Share a database with your integration.
     ![notion03.gif](./docs/notion03.gif)

- 4. Copy the database ID.
    ```bash
    https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                      |--------- Database ID --------|
    ```

### 3. Connection file for Firestore (Optional)

In order to store sensitive data, including information such as certificates and mailboxes, and to manage configuration parameters through the Firestore database in the future.

We must first create a Firestore database and link it.

- 1. Go to [Firestore console](https://console.firebase.google.com/) and create new project
     ![firestore01.png](./docs/firestore01.png)

- 2. Generate a new private key and save the JSON file.
     ![firestore02.png](./docs/firestore02.png)

- 3. Please add it into `./server/configs` folder, and rename it to `serviceAccountKey.json`. **Remember do not commit yours `serviceAccountKey.json` to the cloud.**
     ![firestore03.png](./docs/firestore03.png)
     
### 4. Configuration schema in Firestore (Optional)

Go to your Firebase console, and setup Database with following schema.

- Path
    ```bash
    users (collection)
    --> <AUTO_GENERATE_UID> (document)
    ----> (fields)
    ```

- Fields
    ```json
    {
        "jiraEmail": "<YOUR_JIRA_ACCOUNT_EMAIL>",
        "jiraToken": "<YOUR_JIRA_ACCOUNT_TOKEN>",
        "notionDatabaseId": "<YOUR_NOTION_DATABASE_ID>",
        "notionToken": "<YOUR_NOTION_TOKEN>"
    }
    ```
  
When everything is done, your Firestore will look like this:
![firestore04.png](./docs/firestore04.png)

**If you need handle multiple account, just add data in (document) below `users` (collection)**

## 👷 Installation

### Environment

- Node: v14.16.1

### Manual run in local (Optioneal)

After you finish the above configurations, then do
```bash
yarn install
node ./server/index.js
```

### Build docker
```bash
docker build -f scripts/dockerfile -t jira2notion:latest .
```

### Run docker
```bash
docker run -dit jira2notion
```

## 🔑 License

Released under the MIT License.