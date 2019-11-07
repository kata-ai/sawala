import React, { Fragment } from 'react';

import { Comment as CommentInterface, CommentType } from 'types';

import Speech from './components';

import { FileIcon } from 'icons';
import { checkValidImage, parseAsJSON } from 'libs/utils';

interface SpeechProps {
  comment: CommentInterface;
  isMyComment: boolean;
  onSelectImage: (image: string) => void;
}

interface SpeechState {}

class QismoSpeech extends React.Component<SpeechProps, SpeechState> {
  render() {
    return (
      <Fragment>
        <Speech.Box>
          {this.renderText()}
          {this.renderTextJson()}
          {this.renderSystemEvent()}
          {this.renderFileAttachment()}

          {this.renderReplyText()}
          {this.renderReplyFileAttachment()}
          {/* TODO: Need handle type of message buttons, card, carousel, custom */}
          {this.renderReplyButtons()}
          {this.renderReplyCard()}
          {this.renderReplyCarousel()}
          {this.renderReplyCustom()}
        </Speech.Box>
      </Fragment>
    );
  }

  private renderText = () => {
    const { message } = this.props.comment;
    const path = this.getFileFromText(message);
    const jsonText = this.getJsonFromText(message);

    // when comment text is [file] url [/file]
    if (this.typeOfCommentIs(CommentType.Text) && !jsonText) {
      if (path) {
        if (this.isImage(path)) {
          return (
            <Fragment>
              <Speech.Attachment>
                <Speech.Image
                  src={path}
                  alt="image"
                  onClick={() => this.props.onSelectImage(path)}
                />
              </Speech.Attachment>
            </Fragment>
          );
        }
        if (this.isFile(path)) {
          return (
            <Speech.Attachment>
              <Speech.AttachmentFile
                href={path}
                target="_blank"
                isMyComment={this.props.isMyComment}
              >
                <Speech.AttachmentIcon>
                  <FileIcon fill={this.getIconColor()} />
                </Speech.AttachmentIcon>
                <Speech.AttachmentName>
                  {this.getFileName(path)}
                </Speech.AttachmentName>
              </Speech.AttachmentFile>
            </Speech.Attachment>
          );
        }

        const res = checkValidImage(path).then(async (response: any) => {
          return response.status === 'ok';
        });
        if (res) {
          return (
            <Fragment>
              <Speech.Attachment>
                <Speech.Image
                  src={path}
                  alt="image"
                  onClick={() => this.props.onSelectImage(path)}
                />
              </Speech.Attachment>
            </Fragment>
          );
        }
      }
      return <p>{message}</p>;
    }
  };

  private renderTextJson = () => {
    const { message } = this.props.comment;
    const jsonText = this.getJsonFromText(message);

    // when comment text is [json] json data [/json]
    if (jsonText) {
      const jsonMessage = parseAsJSON(jsonText);
      const fileUrl: string = jsonMessage ? jsonMessage['fileUrl'] : '';
      const fileName: string = jsonMessage ? jsonMessage['fileName'] : '';
      const fileExtension: string = jsonMessage ? jsonMessage['fileType'] : '';

      if (fileUrl) {
        if (this.isExtensionAsImage(fileExtension)) {
          return (
            <Fragment>
              <Speech.Attachment>
                <Speech.Image
                  src={fileUrl}
                  alt="image"
                  onClick={() => this.props.onSelectImage(fileUrl)}
                />
              </Speech.Attachment>
            </Fragment>
          );
        }

        return (
          <Speech.Attachment>
            <Speech.AttachmentFile
              href={fileUrl}
              target="_blank"
              isMyComment={this.props.isMyComment}
            >
              <Speech.AttachmentIcon>
                <FileIcon fill={this.getIconColor()} />
              </Speech.AttachmentIcon>
              <Speech.AttachmentName>
                {`${fileName}.${fileExtension}`}
              </Speech.AttachmentName>
            </Speech.AttachmentFile>
          </Speech.Attachment>
        );
      }
    }
  };

  private renderSystemEvent = () => {
    if (this.typeOfCommentIs(CommentType.SystemEvent)) {
      return (
        <Speech.Info>
          <Speech.System>{this.props.comment.message}</Speech.System>
        </Speech.Info>
      );
    }
  };

  // when comment type is file_attachment
  private renderFileAttachment = () => {
    const { payload } = this.props.comment;
    if (this.typeOfCommentIs(CommentType.FileAttachment)) {
      return (
        payload &&
        payload.url && (
          <Fragment>
            {this.isImage(payload.url) ? (
              <Speech.Attachment>
                <Speech.Image
                  src={payload.url}
                  alt={payload.file_name}
                  onClick={() => {
                    if (payload.url) {
                      this.props.onSelectImage(payload.url);
                    }
                  }}
                />
              </Speech.Attachment>
            ) : (
              payload.file_name && (
                <Speech.Attachment>
                  <Speech.AttachmentFile
                    href={payload.url}
                    target="_blank"
                    isMyComment={this.props.isMyComment}
                  >
                    <Speech.AttachmentIcon>
                      <FileIcon fill={this.getIconColor()} />
                    </Speech.AttachmentIcon>
                    <Speech.AttachmentName>
                      {payload.file_name}
                    </Speech.AttachmentName>
                  </Speech.AttachmentFile>
                </Speech.Attachment>
              )
            )}
            {payload.caption && <p>{payload.caption}</p>}
          </Fragment>
        )
      );
    }
  };

  private renderReplyText = () => {
    if (
      this.isReply() &&
      (this.typeOfReplyCommentIs(CommentType.Text) ||
        this.typeOfReplyCommentIs(CommentType.Reply))
    ) {
      return (
        <Fragment>
          <Speech.Reply>
            {this.props.comment.payload && (
              <p>{this.props.comment.payload.replied_comment_message}</p>
            )}
          </Speech.Reply>
          <p>{this.props.comment.payload && this.props.comment.payload.text}</p>
        </Fragment>
      );
    }
  };

  private renderReplyFileAttachment = () => {
    if (
      this.isReply() &&
      this.typeOfReplyCommentIs(CommentType.FileAttachment)
    ) {
      return (
        this.props.comment.payload &&
        this.props.comment.payload.replied_comment_payload && (
          <Speech.Reply>
            <span>
              {this.props.comment.payload.replied_comment_payload.file_name}
            </span>
          </Speech.Reply>
        )
      );
    }
  };

  private renderReplyButtons = () => {
    if (this.isReply() && this.typeOfReplyCommentIs(CommentType.Buttons)) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  };

  private renderReplyCard = () => {
    if (this.isReply() && this.typeOfReplyCommentIs(CommentType.Card)) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  };

  private renderReplyCarousel = () => {
    if (this.isReply() && this.typeOfReplyCommentIs(CommentType.Carousel)) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  };

  private renderReplyCustom = () => {
    if (this.isReply() && this.typeOfReplyCommentIs(CommentType.Custom)) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  };

  private isReply = (): boolean => {
    return this.props.comment.type === CommentType.Reply;
  };

  private typeOfReplyCommentIs = (type: CommentType) => {
    if (this.isReply() && this.props.comment.payload) {
      return this.props.comment.payload.replied_comment_type === type;
    }
    return false;
  };

  private typeOfCommentIs = (type: CommentType) => {
    return this.props.comment.type === type;
  };

  private getFileName = (path: string) => {
    if (path) {
      return path.substring(path.lastIndexOf('/') + 1);
    }
    return '';
  };

  private isImage = (path: string) => {
    return path.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null;
  };

  private isExtensionAsImage = (extension: string) => {
    const extensionImages = ['jpeg', 'jpg', 'gif', 'png', 'webp', 'svg'];
    const isExtension =
      extensionImages.findIndex((ext: string) => ext === extension) > -1;
    return isExtension;
  };

  private isFile = (path: string) => {
    return path.match(/\.(mov|mp4|avi|mkv|tar|zip|rar|iso|pdf|7z)$/) != null;
  };

  private getFileFromText = (text: string) => {
    const regex = RegExp(/(\[file\])(.*?)(\[\/file\])/g);
    const match = regex.exec(text);
    if (match) {
      return match[2].trim();
    }
    return null;
  };

  private getJsonFromText = (text: string) => {
    const regex = RegExp(/(\[json\])(.*?)(\[\/json\])/g);
    const match = regex.exec(text);
    if (match) {
      return match[2].trim();
    }
    return null;
  };

  private getIconColor = () => {
    return this.props.isMyComment ? '#FFFFFF' : '#949A9D';
  };
}

export default QismoSpeech;
