import React, { ComponentType, Component, ComponentClass } from 'react';
import QiscusSDKCore from 'libs/SDKCore';
import { Comment, Room, User, QiscusCore, Selected } from 'types';

export type withQismoSDKProps = {
  core?: QiscusCore;
  selected?: Selected | null;
  isLoadingMore?: boolean;
  previewImage?: string;
  activeReplyComment?: Comment;
  onFetchComments?: (firstId: number) => void;
  onInit?: (user: User) => void;
  onSubmitImage?: (caption?: string) => void;
  onSubmitFile?: (file: File) => void;
  onDeleteComment?: (uniqueId: string, isForEveryone: boolean) => void;
  onChatTarget?: (email: string) => void;
  onClearPreview?: () => void;
  onPreviewImage?: (file: File) => void;
  onSubmitText?: (text: string) => void;
  onReplyCommment?: (comment: Comment) => void;
  onCloseReplyCommment?: () => void;
  onSetActiveRoom?: (room: Room) => void;
};

interface QiscusSDK {
  authData: object;
  previewImage?: string;
  file?: File;
  activeReplyComment?: Comment;
  isLoadingMore?: boolean;
}

export function withQismoSDK(
  WrappedComponent: ComponentType<withQismoSDKProps>
): ComponentClass<withQismoSDKProps> {
  return class extends Component<withQismoSDKProps> {
    public state: QiscusSDK = {
      authData: {}
    };

    constructor(props: withQismoSDKProps) {
      super(props);
      this.handleInit = this.handleInit.bind(this);
      this.handlePreviewImage = this.handlePreviewImage.bind(this);
      this.handleSubmitFile = this.handleSubmitFile.bind(this);
      this.handleSubmitImage = this.handleSubmitImage.bind(this);
      this.handleSubmitText = this.handleSubmitText.bind(this);
      this.handleFetchComments = this.handleFetchComments.bind(this);
      this.handleClearPreview = this.handleClearPreview.bind(this);
      this.handleReplyComment = this.handleReplyComment.bind(this);
      this.handleCloseReplyComment = this.handleCloseReplyComment.bind(this);
      this.handleSetActiveRoom = this.handleSetActiveRoom.bind(this);
      this.handleDeleteComment = this.handleDeleteComment.bind(this);
      this.handleChatTarget = this.handleChatTarget.bind(this);
    }

    async handleInit(user: User) {
      if (window.qiscus && window.qiscus.isLogin) return;
      await window.qiscus.init({
        AppId: user.app.id,
        options: {
          // tslint:disable-next-line: no-empty
          loginSuccessCallback: (authData: any) => {
            // this.handleChatTarget('fikri@qiscus.com');
          },
          // tslint:disable-next-line: no-empty
          newMessagesCallback: (messages: any) => {}
        }
      });
      await window.qiscus.setUser(user.id, user.password, user.displayName);
      await (window.qiscus.UI = {
        chatTarget: this.handleChatTarget
      });
    }

    handleSubmitFile(file?: File) {
      const { room } = window.qiscus;
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
      const { file } = this.state;
      const { room } = window.qiscus;
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
      const { activeReplyComment } = this.state;
      const { room } = window.qiscus;
      if (room) {
        const roomId = room.id;
        if (!activeReplyComment) {
          window.qiscus.sendComment(roomId, text).then((response: any) => {
            // tslint:disable-next-line:no-console
            console.log('handle submit comment text', response);
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

    handleFetchComments(firstId: number) {
      this.setState({ isLoadingMore: true });
      window.qiscus.loadMore(firstId).then(() => {
        this.setState({ isLoadingMore: false });
      });
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

    handleDeleteComment(uniqueId: string, isForEveryone: boolean) {
      const { room } = window.qiscus;
      if (room) {
        window.qiscus
          .deleteComment(room.id, [uniqueId], isForEveryone, true)
          .then((response: any) => {
            // tslint:disable-next-line:no-console
            console.log('delete comment', response);
          });
      }
    }

    handleChatTarget(email: string) {
      if (email) {
        window.qiscus.chatTarget(email).then((response: Selected) => {
          window.qiscus.selected = response;
          this.forceUpdate();
        });
      }
    }

    render() {
      return (
        <WrappedComponent
          core={QiscusSDKCore}
          selected={window.qiscus.selected}
          isLoadingMore={this.state.isLoadingMore}
          onInit={this.handleInit}
          onPreviewImage={this.handlePreviewImage}
          onFetchComments={this.handleFetchComments}
          onDeleteComment={this.handleDeleteComment}
          onSubmitFile={this.handleSubmitFile}
          onSubmitImage={this.handleSubmitImage}
          onSubmitText={this.handleSubmitText}
          onChatTarget={this.handleChatTarget}
          activeReplyComment={this.state.activeReplyComment}
          previewImage={this.state.previewImage}
          onClearPreview={this.handleClearPreview}
          onReplyCommment={this.handleReplyComment}
          onCloseReplyCommment={this.handleCloseReplyComment}
          onSetActiveRoom={this.handleSetActiveRoom}
          {...this.props}
        />
      );
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
