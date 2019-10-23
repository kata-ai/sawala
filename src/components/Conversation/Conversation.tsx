import React, { createRef, RefObject, Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { withQismoSDKProps } from 'containers/withQismoSDK';
import { parseAsJSON } from 'libs/utils';

import { Comment as CommentInterface } from 'types';

import { Conversation } from './components';

import { Comment } from '../Comment';

interface InnerProps {
  reload: boolean;
  onClickDetailComment: (comment: CommentInterface) => void;
}

type ConversationProps = InnerProps & withQismoSDKProps;

interface ConversationStates {}

class QismoConversation extends React.Component<
  ConversationProps,
  ConversationStates
> {
  private messagesEnd: RefObject<any> = createRef();

  constructor(props: ConversationProps) {
    super(props);

    this.handleDetailMessage = this.handleDetailMessage.bind(this);
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(
    prevProps: ConversationProps,
    nextProps: ConversationProps
  ) {
    if (prevProps.reload !== nextProps.reload) {
      return setTimeout(() => {
        this.forceUpdate();
        this.scrollToBottom();
      }, 200);
    }
    return false;
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView(false);
  };

  handleDetailMessage(comment: CommentInterface) {
    this.props.onClickDetailComment(comment);
  }

  handleDeleteMessage() {
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  }

  renderBeginning() {
    return (
      <Conversation.Info beginning>
        <Conversation.Span>
          This is the beginning of your conversation
        </Conversation.Span>
      </Conversation.Info>
    );
  }

  renderButtonMore(firstId: number) {
    return (
      <Conversation.Info beginning>
        <Conversation.ButtonMore
          color="secondary"
          size="sm"
          onClick={(event: any) => {
            event.preventDefault();
            event.stopPropagation();

            if (this.props.onFetchComments) {
              this.props.onFetchComments(firstId);
            }
          }}
          disabled={this.props.isLoadingMore}
        >
          {this.props.isLoadingMore ? 'Loading...' : 'Load More'}
        </Conversation.ButtonMore>
      </Conversation.Info>
    );
  }

  render() {
    const { selected } = this.props;

    // grouping comments by it's date
    const comments = this._getComments();
    const groupingComments = _.chain(comments)
      .groupBy(e => moment(e.timestamp).format('dddd, DD MMMM YYYY'))
      .map((values, key) => ({ values, key }))
      .value();

    const isConversationsAll = comments.length > 0 && comments[0].before_id > 0;

    return (
      <Conversation.Index
        showPreview={!!this.props.activeReplyComment}
        commentAreaHidden={
          selected && parseAsJSON(selected.options)['is_resolved']
        }
      >
        {isConversationsAll
          ? this.renderButtonMore(comments[0].id)
          : this.renderBeginning()}
        {groupingComments &&
          groupingComments.map((grouping, index) => (
            <Fragment key={index}>
              <Conversation.Info key={index} beginning>
                <Conversation.Date>{grouping.key}</Conversation.Date>
              </Conversation.Info>
              {grouping.values &&
                grouping.values.map((comment, idx) => (
                  <Comment
                    key={idx}
                    index={idx}
                    comment={comment}
                    commentBefore={
                      idx - 1 < 0 ? null : grouping.values[idx - 1]
                    }
                    isLastComment={idx === grouping.values.length - 1}
                    onOpenDetailMessage={() =>
                      this.handleDetailMessage(comment)
                    }
                    onDeleteMessage={this.handleDeleteMessage}
                    {...this.props}
                  />
                ))}
            </Fragment>
          ))}
        {/* Info */}
        {selected && selected.isResolved && (
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

  private _getComments(): CommentInterface[] {
    const { selected } = this.props;
    if (selected && selected.comments) {
      return selected.comments;
    }
    return [];
  }
}

export default QismoConversation;
