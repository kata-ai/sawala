import { Selected } from './qiscus';

export type Notification = {
  id: number;
  type: string;
  name: string;
  time: string;
  read: boolean;
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
