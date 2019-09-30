import * as React from 'react';
import styled from 'styled-components';

import { User } from './types';
import { variables } from '@kata-kit/theme';

import ChatWindow from './components/ChatWindow';

export type Props = {
  user: User;
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
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Main>
        <ChatWindow {...this.props} />
      </Main>
    );
  }
}
