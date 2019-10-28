import React, { createRef, RefObject, Fragment } from 'react';
import moment from 'moment';
import _ from 'lodash';

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
  hasMounted: boolean = false;
  private messagesTop: RefObject<any> = createRef();
  private messagesEnd: RefObject<any> = createRef();

  componentDidMount() {
    if (!this.hasMounted) {
      this.scrollToBottom();
    }
    this.hasMounted = true;
  }

  componentWillUnmount() {
    this.hasMounted = false;
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
  }

  scrollToTop = () => {
    if (this.messagesTop && this.messagesTop.current) {
      this.messagesTop.current.scrollIntoView(false);
    }
  };

  scrollToBottom = () => {
    if (this.messagesEnd && this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView(false);
    }
  };

  handleDetailMessage = (comment: CommentInterface) => {
    this.props.onClickDetailComment(comment);
  };

  getComments = (): CommentInterface[] => {
    const { selected } = this.props;
    if (selected && selected.comments) {
      return selected.comments;
    }
    return [];
  };

  handleDeleteMessage = () => {
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  };

  renderBeginning = () => {
    return (
      <Conversation.Info beginning>
        <Conversation.Span>
          This is the beginning of your conversation
        </Conversation.Span>
      </Conversation.Info>
    );
  };

  renderButtonMore = (firstId: number) => {
    return (
      <Conversation.Info beginning animate>
        <Conversation.ButtonMore
          color="secondary"
          size="sm"
          onClick={(event: any) => {
            event.preventDefault();
            event.stopPropagation();

            this.props.onFetchComments(firstId).then(() => {
              this.scrollToTop();
            });
          }}
          disabled={this.props.isLoadingMore}
        >
          {this.props.isLoadingMore ? 'Loading...' : 'Load More'}
        </Conversation.ButtonMore>
      </Conversation.Info>
    );
  };

  render() {
    const { selected } = this.props;

    // grouping comments by it's date
    const comments = this.getComments();
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
        <div ref={this.messagesTop} />
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
        <div ref={this.messagesEnd} />
      </Conversation.Index>
    );
  }
}

export default QismoConversation;
