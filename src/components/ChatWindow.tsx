import * as React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { Selected, QiscusCore, Comment, AppConfig } from 'types';

import { withQismoSDK, withQismoSDKProps } from 'containers/withQismoSDK';
import { parseAsJSON } from 'libs/utils';

import { variables } from '@kata-kit/theme';
import PreviewUpload from './PreviewUpload';
import Header, { AssignmentType } from './Header';
import Conversation from './Conversation';
import Message from './Message';

interface InnerProps {
  onClickHeaderDetail: (selected: Selected) => void;
  onClickHeaderAgent: (type: AssignmentType, selected: Selected) => void;
  onClickDetailComment: (comment: Comment) => void;
  onClickResolved: (selected: Selected) => void;
  onRendered: (core: QiscusCore) => void;
  noSelectedComponent?: React.ReactElement;
  config: AppConfig;
}

interface OuterProps extends withQismoSDKProps {}

export type WindowProps = InnerProps & OuterProps;

type States = {
  reload: boolean;
};

class ChatWindow extends React.PureComponent<WindowProps, States> {
  _isMounted: boolean = false;

  constructor(props: WindowProps) {
    super(props);

    this.state = {
      reload: false
    };

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleOpenDetail = this.handleOpenDetail.bind(this);
    this.handleOpenResolved = this.handleOpenResolved.bind(this);
    this.handleOpenAssignment = this.handleOpenAssignment.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const { config, core, onInit, onRendered } = this.props;
    if (onInit && this._isMounted) {
      await onInit(config);
      if (core) {
        onRendered(core);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  handleOpenResolved() {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickResolved(this.props.core.selected);
    }
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
      selected,
      onClearPreview,
      onPreviewImage,
      onSubmitImage,
      noSelectedComponent
    } = this.props;
    const { reload } = this.state;

    return (
      <React.Fragment>
        <Container>
          {selected ? (
            <React.Fragment>
              {previewImage && (
                <PreviewUpload
                  selected={selected}
                  background={previewImage}
                  onClosed={() => {
                    if (onClearPreview) {
                      onClearPreview();
                    }
                  }}
                  onChangedImage={(file: File) => {
                    if (onPreviewImage) {
                      onPreviewImage(file);
                    }
                  }}
                  onSubmitted={(caption?: string) => {
                    if (onSubmitImage) {
                      onSubmitImage(caption);
                    }
                  }}
                />
              )}

              <Header
                onSwitchBot={this.handleSwitchBot}
                onOpenDetail={this.handleOpenDetail}
                onOpenAssignment={this.handleOpenAssignment}
                onOpenResolved={this.handleOpenResolved}
                {...this.props}
              />
              <Conversation reload={reload} {...this.props} />
              {!parseAsJSON(selected.options)['is_resolved'] && (
                <Message
                  onSubmitComment={this.handleSubmitComment}
                  {...this.props}
                />
              )}
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
