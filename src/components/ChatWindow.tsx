import * as React from 'react';
import { compose } from 'recompose';

import { User, Selected } from 'types';

import { withQismoSDK, withQismoSDKProps } from 'containers/withQismoSDK';

import PreviewUpload from './PreviewUpload';
import Header, { AssignmentType } from './Header';
import Conversation from './Conversation';
import Message from './Message';

interface InnerProps {
  user: User;
  onClickHeaderDetail: (selected: Selected) => void;
  onClickHeaderAgent: (type: AssignmentType, selected: Selected) => void;
  onClickDetailComment(comment: Comment): void;
}

interface OuterProps extends withQismoSDKProps {}

export type WindowProps = InnerProps & OuterProps;

type States = {
  reload: boolean;
};

class ChatWindow extends React.PureComponent<WindowProps, States> {
  constructor(props: WindowProps) {
    super(props);

    this.state = {
      reload: false
    };

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleOpenDetail = this.handleOpenDetail.bind(this);
    this.handleOpenAssignment = this.handleOpenAssignment.bind(this);
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

  handleOpenDetail() {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickHeaderDetail(this.props.core.selected);
    }
  }

  handleOpenAssignment(type: AssignmentType) {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickHeaderAgent(type, this.props.core.selected);
    }
  }

  render() {
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
          onOpenDetail={this.handleOpenDetail}
          onOpenAssignment={this.handleOpenAssignment}
          {...this.props}
        />
        <Conversation reload={this.state.reload} {...this.props} />
        <Message onSubmitComment={this.handleSubmitComment} {...this.props} />
      </React.Fragment>
    );
  }
}

export default compose<WindowProps, {}>(withQismoSDK)(ChatWindow);
