import React, { ComponentType, Component, ComponentClass } from 'react';
import QiscusSDKCore from 'libs/SDKCore';
import {
  Comment,
  QiscusCore,
  Selected,
  CommentType,
  Payload,
  AppConfig
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
  imageURL?: string;
  onFetchComments: (firstId: number) => Promise<any>;
  onInit: (config: AppConfig) => Promise<boolean>;
  onUploadImage: (file: File) => Promise<string>;
  onSubmitImage: (url: string, file: File, caption: string) => Promise<any>;
  onSubmitFile: (file: File) => void;
  onDeleteComment: (id: string, isForEveryone: boolean) => Promise<any>;
  onChatTarget?: (email: string) => void;
  onClearPreview: () => void;
  onPreviewImage: (file: File) => void;
  onSubmitText: (text: string) => Promise<any>;
  onReplyCommment?: (comment: Comment) => void;
  onCloseReplyCommment?: () => void;
  // callbacks
  loginSuccessCallback?: (authData: any) => void;
  newMessagesCallback?: (messages: any) => void;
};

interface QiscusSDK {
  authData: object;
  previewImage?: string;
  file?: File;
  activeReplyComment?: Comment;
  isLoadingMore?: boolean;
  imageURL?: string;
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

      this.handleChatTarget = this.handleChatTarget.bind(this);
      this.handleSetSelected = this.handleSetSelected.bind(this);
    }

    handleInit = (config: AppConfig) => {
      window.qiscus.init({
        AppId: config.appId,
        options: {
          // tslint:disable-next-line: no-empty
          loginSuccessCallback: (authData: any) => {
            if (this.props.loginSuccessCallback) {
              this.props.loginSuccessCallback(authData);
            }
          },
          newMessagesCallback: (messages: any) => {
            if (this.props.newMessagesCallback) {
              this.props.newMessagesCallback(messages);
            }
          }
        }
      });
      // auto setUser when config autoConnect & user is defined
      if (config.autoConnect && config.user) {
        const { user } = config;
        window.qiscus.setUser(
          user.id,
          user.password,
          user.displayName,
          user.avatar
        );
      }
      window.qiscus.UI = {
        chatTarget: this.handleChatTarget,
        setSelected: this.handleSetSelected
      };
      return Promise.resolve(true);
    };

    handleSubmitFile = (file?: File) => {
      if (file) {
        // upload file to qiscus server
        uploadFile(file).then((url: string) => {
          const text = `[file] ${url} [/file]`;
          const uniqueId = null;
          const payload = getPayload(url, file);
          const type = CommentType.FileAttachment;

          // send comment with image url
          sendComment(text, uniqueId, type, payload).then(() => {
            this.handleClearPreview();
          });
        });
      }
    };

    handleSubmitImage = (url: string, file: File, caption: string) => {
      const text = `[file] ${url} [/file]`;
      const uniqueId = null;
      const payload = getPayload(url, file, caption);
      const type = CommentType.FileAttachment;

      // send comment with image url
      return sendComment(text, uniqueId, type, payload).then(
        (response: any) => {
          return Promise.resolve(response);
        }
      );
    };

    handleSubmitText = (text: string) => {
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
        const uniqueId = null;
        this.handleCloseReplyComment();
        return sendComment(text, uniqueId, type, payload).then(
          (response: any) => {
            return Promise.resolve(response);
          }
        );
      }

      return sendComment(text).then((response: any) => {
        return Promise.resolve(response);
      });
    };

    handleFetchComments = (firstId: number) => {
      this.setState({ isLoadingMore: true });
      return window.qiscus.loadMore(firstId).then((response: any) => {
        this.setState({ isLoadingMore: false });
        return Promise.resolve(response);
      });
    };

    handleReplyComment = (comment: Comment) => {
      this.setState({
        activeReplyComment: comment
      });
    };

    handleCloseReplyComment = () => {
      this.setState({
        activeReplyComment: undefined
      });
    };

    handleDeleteComment = (id: string, isForEveryone: boolean) => {
      const { selected } = window.qiscus;
      if (selected) {
        return window.qiscus
          .deleteComment(selected.id, [id], isForEveryone, true)
          .then((response: any) => {
            return Promise.resolve(response);
          });
      }
    };

    handlePreviewImage = (ofFile: File) => {
      if (this.state.previewImage) {
        URL.revokeObjectURL(this.state.previewImage);
      }
      this.setState({
        previewImage: URL.createObjectURL(ofFile),
        file: ofFile
      });
    };

    handleUploadImage = (ofFile: File) => {
      // upload file to qiscus server
      return uploadFile(ofFile).then((url: string) => {
        this.setState({ imageURL: url });
        return Promise.resolve(url);
      });
    };

    handleClearPreview = () => {
      this.setState({
        previewImage: undefined,
        file: undefined,
        imageURL: undefined
      });
      if (this.state.previewImage) URL.revokeObjectURL(this.state.previewImage);
    };

    render() {
      return (
        <WrappedComponent
          core={QiscusSDKCore}
          selected={window.qiscus.selected}
          isLoadingMore={this.state.isLoadingMore}
          onInit={this.handleInit}
          currentFile={this.state.file}
          imageURL={this.state.imageURL}
          onUploadImage={this.handleUploadImage}
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

    private handleChatTarget(email: string) {
      if (email) {
        window.qiscus.chatTarget(email).then((response: Selected) => {
          this.setState({
            activeReplyComment: undefined
          });
          window.qiscus.selected = response;
        });
      }
    }

    private handleSetSelected(selected: any) {
      if (selected) {
        this.setState({
          activeReplyComment: undefined
        });
        window.qiscus.selected = selected;
      }
    }
  };
}
