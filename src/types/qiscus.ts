export type Selected = {
  id: number;
  last_comment_id: number;
  last_comment_message: string;
  avatar: string;
  name: string;
  room_type: string;
  participants: Participant[];
  options: string;
  topics: any[];
  comments: Comment[];
  count_notif: number;
  isLoaded: boolean;
  unread_comments: any[];
  custom_title: null;
  custom_subtitle: null;
  unique_id: string;
  isChannel: boolean;
  participantNumber: number;
  // additional
  isResolved?: boolean;
};

export type Comment = {
  id: number;
  before_id: number;
  message: string;
  username_as: string;
  username_real: string;
  date: Date;
  time: string;
  timestamp: Date;
  unique_id: string;
  avatar: string;
  room_id: number;
  isChannel: boolean;
  unix_timestamp: number;
  is_deleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  isDelivered: boolean;
  isRead: boolean;
  isSent: boolean;
  attachment: null;
  payload: Payload;
  status: Status;
  type: CommentType;
  subtype: null;
};

export type Payload = {
  replied_comment_id?: number;
  replied_comment_is_deleted?: boolean;
  replied_comment_message?: string;
  replied_comment_payload?: RepliedCommentPayload;
  replied_comment_sender_email?: string;
  replied_comment_sender_username?: string;
  replied_comment_type?: string;
  text?: string;
};

export type RepliedCommentPayload = {
  url?: string;
  caption?: string;
  file_name?: string;
  size?: number;
  pages?: number;
  encryption_key?: string;
};

export enum Status {
  Read = 'read',
  Sent = 'sent'
}

export enum CommentType {
  Reply = 'reply',
  Text = 'text',
  Buttons = 'buttons',
  Card = 'card',
  Carousel = 'carousel',
  Custom = 'custom',
  FileAttachment = 'file_attachment',
  SystemEvent = 'system_event',
  Image = 'image'
}

export type Participant = {
  avatar_url: string;
  email: string;
  extras: Extras;
  id: number;
  id_str: string;
  last_comment_read_id: number;
  last_comment_read_id_str: string;
  last_comment_received_id: number;
  last_comment_received_id_str: string;
  username: string;
};

export type Extras = {};
