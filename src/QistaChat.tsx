import * as React from 'react';
import styled from 'styled-components';

import { User, Selected, QiscusCore, Comment } from 'types';

import { variables } from '@kata-kit/theme';

import { AssignmentType } from 'components/Header';
import ChatWindow from './components/ChatWindow';

export type Props = {
  user: User;
  onClickHeaderDetail: (selected: Selected) => void; // when user click 'Chat Details'
  onClickHeaderAgent: (type: AssignmentType, selected: Selected) => void; // when user click 'Assign/Remove Agent'
  onClickDetailComment: (comment: Comment) => void; // when user click 'Message Details'
  onRendered: (core: QiscusCore) => void; // when qiscus is initiated
};

const Main = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${variables.colors.white};
`;

export default class QistaChat extends React.PureComponent<Props> {
  render() {
    return (
      <Main>
        <ChatWindow {...this.props} />
      </Main>
    );
  }
}
