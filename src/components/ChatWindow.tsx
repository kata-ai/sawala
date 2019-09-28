import * as React from 'react';
import { compose } from 'recompose';

// import { User } from '../types';

import { withQismoSDK, withQismoSDKProps } from '../containers/withQismoSDK';

import Preview from './PreviewUpload';
import Header from './Header';
import Conversation from './Conversation';
import Message from './Message';

interface InnerProps {
  // user: User;
}

interface OuterProps extends withQismoSDKProps { }

export type Props = InnerProps & OuterProps;

class ChatWindow extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleSomething() {

  }

  render() {
    // const { isShowPreviewComment } = this.props;
    console.log('chat window inside here', this.props);

    return (
      <React.Fragment>
        <Preview
          background={this.props.previewImage}
          onClosed={() => {
            if (this.props.onClearPreview) {
              this.props.onClearPreview();
            }
          }}
          onSubmitted={(caption?: string) => {
            if (this.props.onSubmitImage) {
              this.props.onSubmitImage(caption);
            }
          }}
        />
        <Header
          room={this.props.room}
          onSwitchBot={this.handleSomething}
          onOpenDetail={this.handleSomething}
          onOpenAssignment={this.handleSomething}
        />
        <Conversation
          room={this.props.room}
          showPreview={false}
          onOpenDetailMessage={this.handleSomething}
          onDeleteMessage={this.handleSomething}
        />
        <Message {...this.props} />
      </React.Fragment>
    )
  }
}

export default compose<Props, {}>(withQismoSDK)(ChatWindow);
