import { Selected, Comment, Extras } from './qiscus';

export type Pages = {
  name: string;
  icon: string;
  description: string;
};

export type Type = 'facebook' | 'line' | 'whatsapp' | 'telegram';
export type RoomType = 'single' | 'group';

export type Agent = {
  id: number;
  name: string;
  email: string;
  role: string;
  assigned_to: string;
  manage: string;
  type?: Type;
  count?: number;
  active?: boolean;
};

export type AgentForm = {
  name: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
  assigned: string | null;
};

export type RoleForm = {
  name: string | null;
};

export type ChatInformation = {
  key: string;
  value: string;
};

export type ChatDetailForm = {
  notes: string | null;
  informations: ChatInformation[];
};

export type SelectFilter = {
  id: number;
  name: string;
  value: string;
};

export type Conversation = {
  id: number;
  name: string;
  avatar: string;
  last_comment_message: string;
  last_comment_id: string;
  last_comment_message_created_at: string;
  last_comment_topic_title?: string;
  created_at: string;
  count_notif: number;
  type: Type;
  unique_id: string;
  comments: Comment[];
  custom_subtitle?: string;
  custom_title?: string;
  isChannel: boolean;
  isLoaded: boolean;
  room_type: RoomType;
  options?: object;
  participantNumber?: number;
  participants?: string;
  secret_code?: string;
  topics?: string[];
  unread_comments?: string[];
};

export type Content = {
  caption: string;
  file_name: number;
  size: number;
  url: string;
};

export type UserAvatar = {
  avatar: Avatar;
};

export type Avatar = {
  url: string;
};

export type Room = {
  id: number;
  last_comment_id: number;
  last_comment_message: string;
  last_comment_message_created_at: Date;
  avatar: string;
  name: string;
  room_type: RoomType;
  options: string;
  topics: any[];
  comments: any[];
  count_notif: number;
  isLoaded: boolean;
  unread_comments: any[];
  custom_title: null;
  custom_subtitle: null;
  unique_id: string;
  isChannel: boolean;
  is_resolved?: boolean;
  type?: Type;
};

export type Notification = {
  id: number;
  type: string;
  name: string;
  time: string;
  read: boolean;
};

export type Auth = {
  app: App;
  avatar: Avatar;
  avatar_url: string;
  email: string;
  extras: Extras;
  id: number;
  id_str: string;
  last_comment_id: number;
  last_comment_id_str: string;
  last_sync_event_id: number;
  pn_android_configured: boolean;
  pn_ios_configured: boolean;
  rtKey: string;
  token: string;
  username: string;
};

export type App = {
  code: string;
  id: number;
  id_str: string;
  name: string;
};

export type QiscusCore = {
  events: UI;
  rooms: any[];
  selected: Selected | null;
  room_name_id_map: UI;
  pendingCommentId: number;
  uploadedFiles: any[];
  chatmateStatus: null;
  version: string;
  // TODO: set to interface
  userData: any;
  AppId: null;
  baseURL: string;
  uploadURL: string;
  mqttURL: string;
  HTTPAdapter: null;
  realtimeAdapter: null;
  customEventAdapter: null;
  isInit: boolean;
  isSynced: boolean;
  sync: string;
  httpsync: null;
  eventsync: null;
  extras: null;
  last_received_comment_id: number;
  googleMapKey: string;
  options: Options;
  UI: UI;
  mode: string;
  avatar: boolean;
  plugins: any[];
  isLogin: boolean;
  isLoading: boolean;
  emoji: boolean;
  isTypingStatus: string;
  customTemplate: boolean;
  templateFunction: null;
  debugMode: boolean;
  debugMQTTMode: boolean;
  lastReceiveMessages: any[];
};

export type UI = {};

export type Options = {
  avatar: boolean;
};

export enum Qiscus {
  LOGIN_SUCCESS = 'qiscus::login_success',
  NEW_MESSAGE = 'qiscus::new_message',
  PRESENCE_CALLBACK = 'qiscus::presence_callback',
  COMMENT_READ = 'qiscus::comment_read',
  COMMENT_DELIVERED = 'qiscus::comment_delivered',
  TYPING = 'qiscus::typing'
}
