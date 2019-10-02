import * as React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { User, Selected, QiscusCore, Comment } from 'types';

import { withQismoSDK, withQismoSDKProps } from 'containers/withQismoSDK';

import { variables } from '@kata-kit/theme';
import PreviewUpload from './PreviewUpload';
import Header, { AssignmentType } from './Header';
import Conversation from './Conversation';
import Message from './Message';

interface InnerProps {
  user: User;
  onClickHeaderDetail: (selected: Selected) => void;
  onClickHeaderAgent: (type: AssignmentType, selected: Selected) => void;
  onClickDetailComment: (comment: Comment) => void;
  onRendered: (core: QiscusCore) => void;
  noSelectedComponent?: React.ReactElement;
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

  async componentDidMount() {
    const { user, core, onInit, onRendered } = this.props;
    if (onInit) {
      await onInit(user);
      if (core) {
        onRendered(core);
      }
    }
  }

  handleSwitchBot(event: any) {
    // tslint:disable-next-line: no-console
    console.log('handle switch bot.', event);
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
    const {
      previewImage,
      onClearPreview,
      onSubmitImage,
      noSelectedComponent
    } = this.props;
    const { reload } = this.state;

    return (
      <React.Fragment>
        <Container>
          {this.props.selected ? (
            <React.Fragment>
              <PreviewUpload
                background={previewImage}
                onClosed={() => {
                  if (onClearPreview) {
                    onClearPreview();
                  }
                }}
                onSubmitted={(caption?: string) => {
                  if (onSubmitImage) {
                    onSubmitImage(caption);
                  }
                }}
              />
              <Header
                onSwitchBot={this.handleSwitchBot}
                onOpenDetail={this.handleOpenDetail}
                onOpenAssignment={this.handleOpenAssignment}
                {...this.props}
              />
              <Conversation reload={reload} {...this.props} />
              <Message
                onSubmitComment={this.handleSubmitComment}
                {...this.props}
              />
            </React.Fragment>
          ) : (
            noSelectedComponent
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${variables.colors.white};
`;

export default compose<WindowProps, {}>(withQismoSDK)(ChatWindow);
