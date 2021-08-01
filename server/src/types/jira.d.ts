export interface Resolution {
  self: string;
  id: string;
  description: string;
  name: string;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface Assignee {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: any;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface Component {
  self: string;
  id: string;
  name: string;
}

export interface Creator {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: any;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface Reporter {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: any;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface Aggregateprogress {
  progress: number;
  total: number;
  percent: number;
}

export interface Progress {
  progress: number;
  total: number;
  percent: number;
}

export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  hierarchyLevel: number;
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: any;
}

export interface Watches {
  self: string;
  watchCount: number;
  isWatching: boolean;
}

export interface Attrs {
  width: number;
  layout: string;
}

export interface ContentAttrs {
  id: string;
  type: string;
  collection: string;
  width: number;
  height: number;
}

export interface Content {
  type: string;
  attrs: ContentAttrs;
}

export interface DescriptionContent {
  type: string;
  attrs: Attrs;
  content: Content[];
}

export interface Description {
  version: number;
  type: string;
  content: DescriptionContent[];
}

export interface Fields {
  statuscategorychangedate: Date;
  fixVersions: any[];
  resolution: Resolution;
  lastViewed: Date;
  priority: Priority;
  labels: string[];
  timeestimate: number;
  aggregatetimeoriginalestimate?: any;
  versions: any[];
  issuelinks: any[];
  assignee: Assignee;
  status: Status;
  components: Component[];
  aggregatetimeestimate: number;
  creator: Creator;
  subtasks: any[];
  reporter: Reporter;
  aggregateprogress: Aggregateprogress;
  progress: Progress;
  votes: Votes;
  issuetype: Issuetype;
  timespent: number;
  project: Project;
  aggregatetimespent: number;
  resolutiondate: Date;
  workratio: number;
  watches: Watches;
  created: Date;
  updated: Date;
  timeoriginalestimate?: any;
  description: Description;
  security?: any;
  summary: string;
  environment?: any;
  duedate?: any;
}

export interface JiraIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface JiraSearchForIssuesResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraIssue[];
}
