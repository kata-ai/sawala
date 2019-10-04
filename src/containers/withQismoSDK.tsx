import React, { ComponentType, Component, ComponentClass } from 'react';
import QiscusSDKCore from 'libs/SDKCore';
import {
  Comment,
  User,
  QiscusCore,
  Selected,
  CommentType,
  Payload
} from 'types';
import { sendComment, uploadFile } from 'libs/utils';
import { getPayload } from 'libs/utils/response';

export type withQismoSDKProps = {
  core?: QiscusCore;
  selected?: Selected | null;
  isLoadingMore?: boolean;
  previewImage?: string;
  activeReplyComment?: Comment;
  currentFile?: File;
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
      if (file) {
        // upload file to qiscus server
        uploadFile(file).then((url: string) => {
          const text = `[file] ${url} [/file]`;
          const timestamp = new Date();
          const uniqueId = timestamp.toDateString();
          const payload = getPayload(url, file);
          const type = CommentType.FileAttachment;

          // send comment with image url
          sendComment(text, uniqueId, type, payload).then(() => {
            this.handleClearPreview();
          });
        });
      }
    }

    handleSubmitImage(caption?: string) {
      const { file } = this.state;

      if (file) {
        // upload file to qiscus server
        uploadFile(file).then((url: string) => {
          const text = `[file] ${url} [/file]`;
          const timestamp = new Date();
          const uniqueId = timestamp.toDateString();
          const payload = getPayload(url, file, caption);
          const type = CommentType.FileAttachment;

          // send comment with image url
          sendComment(text, uniqueId, type, payload).then(() => {
            this.handleClearPreview();
          });
        });
      }
    }

    handleSubmitText(text: string) {
      const { activeReplyComment } = this.state;
      if (activeReplyComment) {
        const payload: Partial<Payload> = {
          text,
          replied_comment_id: activeReplyComment.id,
          replied_comment_message: activeReplyComment.message,
          replied_comment_sender_email: activeReplyComment.username_real,
          replied_comment_sender_username: activeReplyComment.username_as,
          replied_comment_payload: activeReplyComment.payload,
          replied_comment_type: activeReplyComment.type
        };
        const type = CommentType.Reply;
        const timestamp = new Date();
        const uniqueId = timestamp.toDateString();
        this.handleCloseReplyComment();
        sendComment(text, uniqueId, type, payload).then((response: any) => {
          // tslint:disable-next-line:no-console
          console.log('handle submit reply comment', response);
        });
      } else {
        sendComment(text).then((response: any) => {
          // tslint:disable-next-line:no-console
          console.log('handle submit comment text', response);
        });
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

    handleDeleteComment(uniqueId: string, isForEveryone: boolean) {
      const { selected } = window.qiscus;
      if (selected) {
        window.qiscus
          .deleteComment(selected.id, [uniqueId], isForEveryone, true)
          .then((response: any) => {
            // tslint:disable-next-line:no-console
            console.log('delete comment', response);
          });
      }
    }

    handleChatTarget(email: string) {
      if (email) {
        window.qiscus.chatTarget(email).then(async (response: Selected) => {
          await this.setState({
            activeReplyComment: undefined
          });
          await (window.qiscus.selected = response);
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
          currentFile={this.state.file}
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
