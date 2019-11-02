import * as React from 'react';

import { QiscusCore, Comment, AppConfig, Selected } from 'types';

import ChatWindow from './components/ChatWindow';

export type Props = {
  onClickDetailComment: (comment: Comment) => void; // when user click 'Message Details'
  onRendered: (core: QiscusCore) => void; // when qiscus is initiated
  noSelectedComponent?: React.ReactElement; // customize component when no selected room
  headerComponent?: React.ReactElement; // customize header for additional menu
  onSelectedRoom?: (selected: Selected) => void; // when selected room
  // callbacks
  loginSuccessCallback?: (authData: any) => void;
  newMessagesCallback: (messages: any) => void;
  config: AppConfig;
};

export default class SawalaChat extends React.PureComponent<Props> {
  render() {
    return <ChatWindow {...this.props} />;
  }
}
