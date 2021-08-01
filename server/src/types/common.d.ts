import { JiraIssue } from './jira';

export interface Issue extends JiraIssue {
  notionPageId: string;
}
