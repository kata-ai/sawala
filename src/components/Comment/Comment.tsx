import React, { Fragment } from 'react';
import moment from 'moment';

import { Comment as CommentInterface, Auth } from 'types';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from '@kata-kit/dropdown';

import { withQismoSDKProps } from 'containers/withQismoSDK';

import { Comment } from './components';
import { Speech } from '../Speech';
import { MoreIcon, TickIcon, ReplyIcon } from 'icons';
import getAvatar from 'libs/utils/getAvatar';
import { AVATAR } from 'default';

interface InnerProps {
  index: number;
  comment: CommentInterface;
  onOpenDetailMessage: Function;
  onDeleteMessage: Function;
  commentBefore?: CommentInterface | null;
  isLastComment?: boolean;
}

interface CommentStates {}

type CommentProps = InnerProps & withQismoSDKProps;

class QismoComment extends React.Component<CommentProps, CommentStates> {
  render() {
    const {
      index,
      comment,
      isLastComment,
      onOpenDetailMessage,
      onDeleteMessage
    } = this.props;
    const isMyComment: boolean = this.isMyComment(comment.username_real);
    const isFirstComment: boolean = this.isFirstComment(comment.username_real);

    return (
      <Comment.Chat
        key={index}
        position={isMyComment ? 'right' : 'left'}
        first={isFirstComment}
        isSystem={comment.type === 'system_event'}
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
                    <DropdownItem
                      onClick={() => {
                        // event.stopPropagation();
                        // tslint:disable-next-line: no-console
                        console.log('on click comment', comment);
                        if (this.props.onReplyCommment) {
                          this.props.onReplyCommment(comment);
                        }
                      }}
                    >
                      Reply
                    </DropdownItem>
                    <DropdownItem onClick={() => onDeleteMessage()}>
                      Delete
                    </DropdownItem>
                    <DropdownItem onClick={() => onOpenDetailMessage()}>
                      Message Details
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Comment.Button
                  type="button"
                  color="secondary"
                  onClick={() => {
                    // tslint:disable-next-line: no-console
                    console.log('on click comment left', comment);
                    if (this.props.onReplyCommment) {
                      this.props.onReplyCommment(comment);
                    }
                  }}
                >
                  <ReplyIcon />
                </Comment.Button>
              )}
            </Comment.ChatAction>
            <Comment.ChatTime position={isMyComment ? 'right' : 'left'}>
              {moment(comment.timestamp).format('HH:ss')}
            </Comment.ChatTime>
            {isMyComment && (
              <Comment.ChatTick>
                <TickIcon />
              </Comment.ChatTick>
            )}
          </Fragment>
        ) : (
          <Speech {...this.props} />
        )}
      </Comment.Chat>
    );
  }

  private addDefaultSrc(event: any) {
    event.target.src = AVATAR;
  }

  private isMyComment = (email: string): boolean => {
    if (this.props.core && this.props.core.userData) {
      return email === this.props.core.userData.email;
    }
    return false;
  };

  private isFirstComment = (username: string): boolean => {
    return this.props.commentBefore
      ? username !== this.props.commentBefore.username_real
      : true;
  };
}

export default QismoComment;
