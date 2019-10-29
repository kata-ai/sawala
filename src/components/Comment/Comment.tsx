import React, { Fragment } from 'react';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Comment as CommentInterface } from 'types';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from '@kata-kit/dropdown';

import { withQismoSDKProps } from 'containers/withQismoSDK';

import { Comment } from './components';
import { Speech } from '../Speech';
import { MoreIcon, TickIcon, TicksIcon, ReplyIcon } from 'icons';
import { getAvatar } from 'libs/utils';
import { AVATAR } from 'default';
import { FEATURE_COMMENT_REPLY, FEATURE_COMMENT_DELETE } from 'featureFlags';

interface InnerProps {
  index: number;
  comment: CommentInterface;
  commentBefore?: CommentInterface | null;
  isLastComment?: boolean;
  onOpenDetailMessage: () => void;
  onDeleteMessage: () => void;
}

interface CommentStates {}

type CommentProps = InnerProps & withQismoSDKProps;

class QismoComment extends React.Component<CommentProps, CommentStates> {
  handleDeleteComment = (id: string) => {
    confirmAlert({
      title: 'Delete message',
      message: 'Are you sure want to delete this message?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmDeleteComment(id)
        },
        {
          label: 'No',
          // tslint:disable-next-line: no-empty
          onClick: () => {}
        }
      ]
    });
  };

  addDefaultSrc(event: any) {
    event.target.src = AVATAR;
  }

  isMyComment = (email: string): boolean => {
    if (this.props.core && this.props.core.userData) {
      return email === this.props.core.userData.email;
    }
    return false;
  };

  isFirstComment = (username: string): boolean => {
    return this.props.commentBefore
      ? username !== this.props.commentBefore.username_real
      : true;
  };

  confirmDeleteComment = (id: string) => {
    this.props.onDeleteComment(id, true).then(() => {
      this.props.onDeleteMessage();
    });
  };

  render() {
    const { index, comment, isLastComment, onOpenDetailMessage } = this.props;
    const isMyComment: boolean = this.isMyComment(comment.username_real);
    const isFirstComment: boolean = this.isFirstComment(comment.username_real);

    return (
      <Comment.Chat
        key={index}
        position={isMyComment ? 'right' : 'left'}
        first={isFirstComment}
        isSystem={comment.type === 'system_event'}
        hideMenuOnHover={FEATURE_COMMENT_REPLY}
      >
        {comment.type !== 'system_event' ? (
          <Fragment>
            {isFirstComment && (
              <Comment.ChatImage position={isMyComment ? 'right' : 'left'}>
                <Comment.Image
                  onError={this.addDefaultSrc}
                  src={getAvatar(comment.avatar)}
                />
              </Comment.ChatImage>
            )}
            <Comment.ChatBaloon
              position={isMyComment ? 'right' : 'left'}
              first={isFirstComment}
            >
              <Speech {...this.props} />
            </Comment.ChatBaloon>
            <Comment.ChatAction position={isMyComment ? 'right' : 'left'}>
              {isMyComment ? (
                <Dropdown dropDirection={isLastComment ? 'up' : 'down'}>
                  <DropdownToggle caret={false}>
                    <Comment.Button type="button" color="secondary">
                      <MoreIcon />
                    </Comment.Button>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    {FEATURE_COMMENT_REPLY && (
                      <DropdownItem
                        onClick={() => {
                          if (this.props.onReplyCommment) {
                            this.props.onReplyCommment(comment);
                          }
                        }}
                      >
                        Reply
                      </DropdownItem>
                    )}
                    {FEATURE_COMMENT_DELETE && (
                      <DropdownItem
                        onClick={() =>
                          this.handleDeleteComment(comment.unique_id)
                        }
                      >
                        Delete
                      </DropdownItem>
                    )}
                    <DropdownItem onClick={() => onOpenDetailMessage()}>
                      Message Details
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                FEATURE_COMMENT_REPLY && (
                  <Comment.Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      if (this.props.onReplyCommment) {
                        this.props.onReplyCommment(comment);
                      }
                    }}
                  >
                    <ReplyIcon />
                  </Comment.Button>
                )
              )}
            </Comment.ChatAction>
            <Comment.ChatTime position={isMyComment ? 'right' : 'left'}>
              {moment(comment.timestamp).format('HH:ss')}
            </Comment.ChatTime>
            {isMyComment && !comment.isChannel && (
              <Comment.ChatTick>
                {comment.isDelivered && comment.isRead ? (
                  <TicksIcon />
                ) : (
                  <TickIcon />
                )}
              </Comment.ChatTick>
            )}
          </Fragment>
        ) : (
          <Speech {...this.props} />
        )}
      </Comment.Chat>
    );
  }
}

export default QismoComment;
