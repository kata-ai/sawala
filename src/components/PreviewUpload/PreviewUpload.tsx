import React from 'react';

import { Room } from '../../types';

import { Icon } from '../Commons';
import Preview from './components';

interface PreviewProps {
  room?: Room;
  background?: string;
  onClosed(): void;
  onSubmitted(caption?: string): void;
}

interface PreviewStates {
  caption?: string;
}

class QismoPreviewUpload extends React.Component<PreviewProps, PreviewStates> {
  render() {
    return (
      <Preview.Main background={this.props.background}>
        <Preview.Header>
          <Preview.HeaderTitle>
            <h4>Preview</h4>
            <span>Send to Destriana</span>
          </Preview.HeaderTitle>
          <Preview.CloseButton
            type="button"
            color="secondary"
            onClick={this.props.onClosed}
          >
            <Icon image="close-icon" size="24px" color="#676b6d" />
          </Preview.CloseButton>
        </Preview.Header>
        <Preview.Picker>
          <Preview.PickerButton>Browse</Preview.PickerButton>
          <Preview.PickerInput type="file" accept="image/*" />
        </Preview.Picker>
        <Preview.Action>
          <Preview.ActionText
            onChange={(event: any) => {
              this.setState({ caption: event.target.value });
            }}
            placeholder="Add your caption..."
          />
          <Preview.ActionButton
            type="button"
            color="secondary"
            onClick={(event: any) => {
              event.preventDefault();
              this.props.onSubmitted(this.state.caption);
              this.setState({ caption: undefined });
            }}
          >
            <Icon image="send-icon" size="24px" color="#006fe6" />
          </Preview.ActionButton>
        </Preview.Action>
      </Preview.Main>
    );
  }
}

export default QismoPreviewUpload;
