import * as React from 'react';
import { compose } from 'recompose';

import { User } from 'types';

import { withQismoSDK, withQismoSDKProps } from 'containers/withQismoSDK';

import PreviewUpload from './PreviewUpload';
import Header from './Header';
import Conversation from './Conversation';
import Message from './Message';

interface InnerProps {
  user: User;
}

interface OuterProps extends withQismoSDKProps {}

export type Props = InnerProps & OuterProps;

type States = {
  reload: boolean;
};

class ChatWindow extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reload: false
    };

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (this.props.onInit) {
      this.props.onInit(user);
    }
  }

  handleSomething(event: any) {
    // tslint:disable-next-line: no-console
    console.log('handle something here.', event);
  }

  handleSubmitComment() {
    this.setState(prevState => ({
      reload: !prevState.reload
    }));
  }

  render() {
    // const { isShowPreviewComment } = this.props;
    // tslint:disable-next-line: no-console
    console.log('chat window inside here', this.props);

    return (
      <React.Fragment>
        <PreviewUpload
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
          onSwitchBot={this.handleSomething}
          onOpenDetail={this.handleSomething}
          onOpenAssignment={this.handleSomething}
          {...this.props}
        />
        <Conversation
          reload={this.state.reload}
          showPreview={false}
          onOpenDetailMessage={this.handleSomething}
          onDeleteMessage={this.handleSomething}
          {...this.props}
        />
        <Message onSubmitComment={this.handleSubmitComment} {...this.props} />
      </React.Fragment>
    );
  }
}

export default compose<Props, {}>(withQismoSDK)(ChatWindow);
