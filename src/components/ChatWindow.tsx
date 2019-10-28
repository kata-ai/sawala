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

class ChatWindow extends React.Component<WindowProps, States> {
  constructor(props: WindowProps) {
    super(props);

    this.state = {
      reload: false
    };
  }

  componentDidMount() {
    const { config, core, onInit, onRendered } = this.props;
    onInit(config).then(() => {
      if (core) {
        onRendered(core);
      }
    });
  }

  handleSwitchBot = (event: any) => {
    // tslint:disable-next-line: no-console
    console.log('handle switch bot.', event);
  };

  handleSubmitComment = () => {
    this.setState(prevState => ({
      reload: !prevState.reload
    }));
  };

  handleOpenResolved = () => {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickResolved(this.props.core.selected);
    }
  };

  handleOpenDetail = () => {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickHeaderDetail(this.props.core.selected);
    }
  };

  handleOpenAssignment = (type: AssignmentType) => {
    if (this.props.core && this.props.core.selected) {
      this.props.onClickHeaderAgent(type, this.props.core.selected);
    }
  };

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
                  onClosed={onClearPreview}
                  onChangedImage={onPreviewImage}
                  onSubmitted={(caption?: string) => {
                    onSubmitImage(caption).then(async () => {
                      await onClearPreview();
                    });
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
