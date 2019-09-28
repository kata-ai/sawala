import React, { createRef, RefObject, Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Room as RoomInterface } from '../../types';

import { Conversation } from './components';

import { Comment } from '../Comment';

interface ConversationProps {
  room?: RoomInterface;
  showPreview: boolean;
  onOpenDetailMessage: Function;
  onDeleteMessage: Function;
}

interface ConversationStates { }

class QismoConversation extends React.Component<
  ConversationProps,
  ConversationStates
  > {
  private messagesEnd: RefObject<any> = createRef();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView(false);
  };

  render() {
    const {
      room,
      showPreview,
      onOpenDetailMessage,
      onDeleteMessage
    } = this.props;

    const comments = room
      ? _.chain(room.comments)
        .groupBy(e => moment(e.timestamp).format('dddd, DD MMMM YYYY'))
        .map((values, key) => ({ values, key }))
        .value()
      : [];

    return (
      <Conversation.Index showPreview={showPreview}>
        <Conversation.Info beginning>
          <Conversation.Span>
            This is the beginning of your conversation
          </Conversation.Span>
        </Conversation.Info>
        {comments &&
          comments.map((comment, index) => (
            <Fragment key={index}>
              <Conversation.Info key={index} beginning>
                <Conversation.Date>{comment.key}</Conversation.Date>
              </Conversation.Info>
              {comment.values &&
                comment.values.map((value, idx) => (
                  <Comment
                    key={idx}
                    index={idx}
                    comment={value}
                    commentBefore={idx > 0 ? comment.values[idx - 1] : null}
                    isLastComment={idx === comment.values.length - 1}
                    onOpenDetailMessage={() => onOpenDetailMessage()}
                    onDeleteMessage={() => onDeleteMessage()}
                    {...this.props}
                  />
                ))}
            </Fragment>
          ))}
        {/* Info */}
        {room && room.is_resolved && (
          <Conversation.Info>
            <Conversation.Notif>
              Agent 34 marked this conversation as resolved
            </Conversation.Notif>
          </Conversation.Info>
        )}
        <div ref={this.messagesEnd} />
      </Conversation.Index>
    );
  }
}

export default QismoConversation;
