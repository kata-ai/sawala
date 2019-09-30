import * as React from 'react';

import { User } from './types';

import ChatWindow from './components/ChatWindow';

export type Props = {
  user: User;
};

export default class QistaChat extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <ChatWindow {...this.props} />;
  }
}
