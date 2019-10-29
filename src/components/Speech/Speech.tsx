import React, { Fragment } from 'react';

import { Comment as CommentInterface, CommentType } from 'types';

import Speech from './components';

import { FileIcon } from 'icons';

interface SpeechProps {
  comment: CommentInterface;
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
    const image = this.isTextAsImage(message);

    // when comment text is [file] url [/file]
    if (this.typeOfCommentIs(CommentType.Text)) {
      if (image && this.isImage(image)) {
        return (
          <Fragment>
            <Speech.Attachment>
              <Speech.Image src={image} alt="image" />
            </Speech.Attachment>
          </Fragment>
        );
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
    const {
      payload: { url, ...payload }
    } = this.props.comment;
    if (this.typeOfCommentIs(CommentType.FileAttachment)) {
      return (
        payload &&
        url && (
          <Fragment>
            {this.isImage(url) ? (
              <Speech.Attachment>
                <Speech.Image src={url} alt="image" />
              </Speech.Attachment>
            ) : (
              payload.file_name && (
                <Speech.Attachment>
                  <Speech.AttachmentFile href={url} target="_blank">
                    <FileIcon />
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

  private isImage = (path: string) => {
    return path.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  private isTextAsImage = (text: string) => {
    const regex = RegExp(/(\[file\])(.*?)(\[\/file\])/g);
    const match = regex.exec(text);
    if (match) {
      return match[2].trim();
    }
    return null;
  };
}

export default QismoSpeech;
