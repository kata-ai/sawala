import * as React from 'react';

import { User, Selected, QiscusCore, Comment } from 'types';

import { AssignmentType } from 'components/Header';
import ChatWindow from './components/ChatWindow';

export type Props = {
  user: User;
  onClickHeaderDetail: (selected: Selected) => void; // when user click 'Chat Details'
  onClickHeaderAgent: (type: AssignmentType, selected: Selected) => void; // when user click 'Assign/Remove Agent'
  onClickDetailComment: (comment: Comment) => void; // when user click 'Message Details'
  onRendered: (core: QiscusCore) => void; // when qiscus is initiated
  noSelectedComponent?: React.ReactElement; // customize component when no selected room
};

export default class QistaChat extends React.PureComponent<Props> {
  render() {
    return <ChatWindow {...this.props} />;
  }
}
