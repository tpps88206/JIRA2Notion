export interface Parent {
  type: string;
  database_id: string;
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface Status {
  id: string;
  type: string;
  select: Select;
}

export interface JIRALink {
  id: string;
  type: string;
  url: string;
}

export interface Done {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface Text {
  content: string;
  link?: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: any;
}

export interface JIRAKey {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: any;
}

export interface Name {
  id: string;
  type: string;
  title: Title[];
}

export interface Properties {
  Status: Status;
  'JIRA Link': JIRALink;
  Done: Done;
  'JIRA Key': JIRAKey;
  Name: Name;
}

export interface NotionIssue {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface NotionQueryIssuesResponse {
  object: string;
  results: NotionIssue[];
  next_cursor?: any;
  has_more: boolean;
}
