import React, { Fragment } from 'react';

import { Comment as CommentInterface, CommentType } from 'types';

import Speech from './components';

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

  private renderText() {
    if (this.typeOfCommentIs('text')) {
      return <p>{this.props.comment.message}</p>;
    }
  }

  private renderSystemEvent() {
    if (this.typeOfCommentIs('system_event')) {
      return (
        <Speech.Info>
          <Speech.System>{this.props.comment.message}</Speech.System>
        </Speech.Info>
      );
    }
  }

  private renderFileAttachment() {
    if (this.typeOfCommentIs('file_attachment')) {
      return (
        this.props.comment.payload &&
        this.props.comment.payload.url &&
        (this.isImage(this.props.comment.payload.url) ? (
          <Speech.Attachment>
            <Speech.Image src={this.props.comment.payload.url} alt="image" />
          </Speech.Attachment>
        ) : (
          this.props.comment.payload.file_name && (
            <Speech.Attachment>
              {this.props.comment.payload.file_name}
            </Speech.Attachment>
          )
        ))
      );
    }
  }

  private renderReplyText() {
    if (
      this.isReply() &&
      (this.typeOfReplyCommentIs('text') || this.typeOfReplyCommentIs('reply'))
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
  }

  private renderReplyFileAttachment() {
    if (this.isReply() && this.typeOfReplyCommentIs('file_attachment')) {
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
  }

  private renderReplyButtons() {
    if (this.isReply() && this.typeOfReplyCommentIs('buttons')) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  }

  private renderReplyCard() {
    if (this.isReply() && this.typeOfReplyCommentIs('card')) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  }

  private renderReplyCarousel() {
    if (this.isReply() && this.typeOfReplyCommentIs('carousel')) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  }

  private renderReplyCustom() {
    if (this.isReply() && this.typeOfReplyCommentIs('custom')) {
      return (
        <Speech.Reply>
          <p>{this.props.comment.message}</p>
        </Speech.Reply>
      );
    }
  }

  private isReply = (): boolean => {
    return this.props.comment.type === 'reply';
  };

  private typeOfReplyCommentIs = (type: CommentType) => {
    if (this.isReply() && this.props.comment.payload) {
      return this.props.comment.payload.replied_comment_type === type;
    }
    return false;
  };

  private typeOfCommentIs = (type: CommentType) => {
    if (this.props.comment.payload) {
      return this.props.comment.type === type;
    }
    return false;
  };

  private isImage = (path: string) => {
    return path.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
}

export default QismoSpeech;
