import React, { ComponentType, Component, ComponentClass } from 'react';
import moment from 'moment';
import QiscusSDKCore from '../libs/SDKCore';
import {
  Conversation,
  Comment,
  Room,
  // Qiscus,
  QiscusCore
} from '../types';

export type withQismoSDKProps = {
  coreSDK?: QiscusCore;
  isLogin?: boolean;
  room?: Room;
  conversations?: Conversation[];
  previewImage?: string;
  activeReplyComment?: Comment;
  onSubmitImage?: (caption?: string) => void;
  onSubmitFile?: (file: File) => void;
  onClearPreview?: () => void;
  onPreviewImage?: (file: File) => void;
  onSubmitText?: (text: string) => void;
  onReplyCommment?: (comment: Comment) => void;
  onCloseReplyCommment?: () => void;
  onSetActiveRoom?: (room: Room) => void;
};

interface QiscusSDK {
  isLogin: boolean;
  authData: object;
  room?: Room;
  conversations?: Conversation[];
  previewImage?: string;
  file?: File;
  activeReplyComment?: Comment;
}

const APP_ID = 'sdksample';
const APP_USER = {
  userId: 'guest@qiscus.com',
  password: 'password',
  displayName: 'Guest from Kata.ai'
};
const APP_USER_TARGET = 'fikri@qiscus.com';
const APP_DEFAULT_LIMIT = 100;

export function withQismoSDK(
  WrappedComponent: ComponentType<withQismoSDKProps>
): ComponentClass<withQismoSDKProps> {
  return class extends Component<withQismoSDKProps> {
    public state: QiscusSDK = {
      isLogin: false,
      authData: {}
    };

    constructor(props: withQismoSDKProps) {
      super(props);
      this.handlePreviewImage = this.handlePreviewImage.bind(this);
      this.handleSubmitFile = this.handleSubmitFile.bind(this);
      this.handleSubmitImage = this.handleSubmitImage.bind(this);
      this.handleSubmitText = this.handleSubmitText.bind(this);
      this.handleClearPreview = this.handleClearPreview.bind(this);
      this.handleReplyComment = this.handleReplyComment.bind(this);
      this.handleCloseReplyComment = this.handleCloseReplyComment.bind(this);
      this.handleSetActiveRoom = this.handleSetActiveRoom.bind(this);
      this._setAuthData = this._setAuthData.bind(this);
      this._setLogin = this._setLogin.bind(this);
      this._chatTarget = this._chatTarget.bind(this);
      this._loadRoomList = this._loadRoomList.bind(this);
      this._updateConversations = this._updateConversations.bind(this);
      this._convertToComment = this._convertToComment.bind(this);
    }

    componentWillMount() {
      // tslint:disable-next-line: no-console
      console.log('component did mount', QiscusSDKCore);
      window.qiscus.init({
        AppId: APP_ID,
        options: {
          loginSuccessCallback: (authData: object) => {
            this._setLogin(!!authData);
            this._setAuthData(authData);
            this._chatTarget(APP_USER_TARGET);
          },
          newMessagesCallback: (messages: any) => {
            if (messages) {
              // tslint:disable-next-line:no-console
              console.log(`Qiscus newMessagesCallback`, messages);
              this._updateConversations(messages[0]);
            }
          }
        }
      });
      window.qiscus.setUser(
        APP_USER.userId,
        APP_USER.password,
        APP_USER.displayName
      );
    }

    handleSubmitFile(file?: File) {
      const { room } = this.state;
      if (file && room) {
        window.qiscus.upload(
          file,
          (error: Error, progress: ProgressEvent, url: string) => {
            if (error) {
              // tslint:disable-next-line: no-console
              console.log('Failed uploading file', error);
            }
            if (progress) {
              // tslint:disable-next-line: no-console
              console.log('On progress upload file', progress);
            }
            if (url) {
              const payload = JSON.stringify({
                type: 'file',
                content: {
                  url,
                  caption: '',
                  file_name: file.lastModified,
                  size: file.size
                }
              });
              const roomId = room.id;
              const text = 'Send Attachment';
              const type = 'custom';
              const timestamp = new Date();
              const uniqueId = timestamp.getTime();

              window.qiscus
                .sendComment(roomId, text, uniqueId, type, payload)
                .then((response: any) => {
                  // tslint:disable-next-line:no-console
                  console.log('send file finish', response);
                });
            }
          }
        );
      }
    }

    handleSubmitImage(caption?: string) {
      const { file, room } = this.state;
      if (file && room) {
        window.qiscus.upload(
          file,
          (error: Error, progress: ProgressEvent, url: string) => {
            if (error) {
              // tslint:disable-next-line: no-console
              console.log('Failed uploading image', error);
            }
            if (progress) {
              // tslint:disable-next-line: no-console
              console.log('On progress upload image', progress);
            }
            if (url) {
              const payload = JSON.stringify({
                type: 'image',
                content: {
                  url,
                  caption: caption ? caption : '',
                  text: 'Send Image',
                  file_name: file.lastModified,
                  size: file.size
                }
              });
              const roomId = room.id;
              const text = 'Send Image';
              const type = 'custom';
              const timestamp = new Date();
              const uniqueId = timestamp.getTime();

              window.qiscus
                .sendComment(roomId, text, uniqueId, type, payload)
                .then((response: any) => {
                  this.handleClearPreview();
                });
            }
          }
        );
      }
    }

    handleSubmitText(text: string) {
      const { room, activeReplyComment } = this.state;
      if (room) {
        const roomId = room.id;
        if (!activeReplyComment) {
          window.qiscus.sendComment(roomId, text).then((response: any) => {
            // tslint:disable-next-line:no-console
            console.log('handle submit comment', response);
          });
        } else {
          const payload = {
            text,
            replied_comment_id: activeReplyComment.id,
            replied_comment_message: activeReplyComment.message,
            replied_comment_sender_email: activeReplyComment.username_real,
            replied_comment_sender_username: activeReplyComment.username_as,
            replied_comment_payload: null,
            replied_comment_type: activeReplyComment.type
          };
          this.handleCloseReplyComment();
          window.qiscus
            .sendComment(roomId, text, null, 'reply', JSON.stringify(payload))
            .then((response: any) => {
              // tslint:disable-next-line:no-console
              console.log('handle submit reply comment', response);
            });
        }
      }
    }

    handleReplyComment(comment: Comment) {
      this.setState({
        activeReplyComment: comment
      });
    }

    handleCloseReplyComment() {
      this.setState({
        activeReplyComment: undefined
      });
    }

    handleSetActiveRoom(room: Room) {
      this.setState({ room });
    }

    render() {
      return (
        <WrappedComponent
          coreSDK={QiscusSDKCore}
          onPreviewImage={this.handlePreviewImage}
          onSubmitFile={this.handleSubmitFile}
          onSubmitImage={this.handleSubmitImage}
          onSubmitText={this.handleSubmitText}
          room={this.state.room}
          activeReplyComment={this.state.activeReplyComment}
          isLogin={this.state.isLogin}
          conversations={this.state.conversations}
          previewImage={this.state.previewImage}
          onClearPreview={this.handleClearPreview}
          onReplyCommment={this.handleReplyComment}
          onCloseReplyCommment={this.handleCloseReplyComment}
          onSetActiveRoom={this.handleSetActiveRoom}
          {...this.props}
        />
      );
    }

    private _setAuthData(authData: object) {
      this.setState({ authData });
    }

    private _setLogin(isLogin: boolean) {
      this.setState({ isLogin });
    }

    private _chatTarget(userId: string) {
      window.qiscus.chatTarget(userId).then((room: Room) => {
        this.setState({ room });

        if (!this.state.conversations) {
          this._loadRoomList();
        }
      });
    }

    private _loadRoomList() {
      window.qiscus
        .loadRoomList({ page: 1, limit: APP_DEFAULT_LIMIT })
        .then((rooms: any[]) => {
          this.setState({ conversations: rooms });
        });
    }

    private _updateConversations(withData: any) {
      const conversations = this.state.conversations!;
      const index = conversations.findIndex(conv => {
        return conv.id === withData.room_id;
      });
      if (index > -1) {
        conversations[index] = Object.assign({}, conversations[index], {
          ...withData,
          last_comment_message: withData['message'],
          avatar: withData['room_avatar'],
          name: withData['username'],
          isChannel: false,
          is_deleted: false,
          payload: {},
          room_id: this.state.room!.id
        });
      }

      const newComment = {
        ...withData,
        ...this._convertToComment(withData)
      };
      const comments = { ...this.state.room!.comments, newComment };
      this.setState({ conversations, room: { comments } });
    }

    private _convertToComment(data: any) {
      if (data) {
        return {
          id: data['id'],
          avatar: data['room_avatar'],
          date: moment(data['created_at']).format('YYYY-MM-DD'),
          time: moment(data['created_at']).format('HH:ss'),
          message: data['message'],
          status: data['status'],
          type: data['type'],
          username_real: data['email'],
          username_as: data['username'],
          attachment: null,
          before_id: data['comment_before_id'],
          isRead: false,
          isChannel: false,
          isDelivered: true,
          isFailed: false,
          isPending: false,
          isSent: true,
          is_deleted: false,
          payload: data['payload'],
          room_id: data['room_id'],
          subtype: null,
          timestamp: data['timestamp'],
          unique_id: data['unique_temp_id'],
          unix_timestamp: data['unix_timestamp']
        };
      }
      return {};
    }

    private handlePreviewImage(ofFile: File) {
      if (this.state.previewImage) URL.revokeObjectURL(this.state.previewImage);
      this.setState({
        previewImage: URL.createObjectURL(ofFile),
        file: ofFile
      });
      this.forceUpdate();
    }

    private handleClearPreview() {
      this.setState({ previewImage: null, file: null });
    }
  };
}
