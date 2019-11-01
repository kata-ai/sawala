import React, { Fragment } from 'react';

import { Comment as CommentInterface, CommentType } from 'types';

import Speech from './components';

import { FileIcon } from 'icons';
import { checkValidImage } from 'libs/utils';

interface SpeechProps {
  comment: CommentInterface;
  isMyComment: boolean;
}

interface SpeechState {}

class QismoSpeech extends React.Component<SpeechProps, SpeechState> {
  render() {
    return (
      <Fragment>
        <Speech.Box>
          {this.renderText()}
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

    // when comment text is [file] url [/file]
    if (this.typeOfCommentIs(CommentType.Text)) {
      if (path) {
        if (this.isImage(path)) {
          return (
            <Fragment>
              <Speech.Attachment>
                <Speech.Image src={path} alt="image" />
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
                <FileIcon fill={this.getIconColor()} />
                {this.getFileName(path)}
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
                <Speech.Image src={path} alt="image" />
              </Speech.Attachment>
            </Fragment>
          );
        }
      }
      return <p>{message}</p>;
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
                <Speech.Image src={payload.url} alt={payload.file_name} />
              </Speech.Attachment>
            ) : (
              payload.file_name && (
                <Speech.Attachment>
                  <Speech.AttachmentFile
                    href={payload.url}
                    target="_blank"
                    isMyComment={this.props.isMyComment}
                  >
                    <FileIcon fill={this.getIconColor()} />
                    {payload.file_name}
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

  private getIconColor = () => {
    return this.props.isMyComment ? '#FFFFFF' : '#949A9D';
  };
}

export default QismoSpeech;
