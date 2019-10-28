import React from 'react';

import { Selected } from 'types';

import Preview from './components';
import { SendIcon, CloseIcon } from 'icons';

interface PreviewProps {
  selected: Selected;
  background?: string;
  onClosed: () => void;
  onChangedImage: (file: File) => void;
  onSubmitted: (caption?: string) => void;
}

interface PreviewStates {
  caption?: string;
}

class QismoPreviewUpload extends React.Component<PreviewProps, PreviewStates> {
  handleCaptionChange = (event: any) => {
    this.setState({ caption: event.target.value });
  };

  handleCaptionKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      this.props.onSubmitted(this.state.caption || '');
      this.setState({ caption: undefined });
    }
  };

  render() {
    const { selected } = this.props;
    return (
      <Preview.Main background={this.props.background}>
        <Preview.Header>
          <Preview.HeaderTitle>
            <h4>Preview</h4>
            <span>Send to {selected.name || 'user'}</span>
          </Preview.HeaderTitle>
          <Preview.CloseButton
            type="button"
            color="secondary"
            onClick={this.props.onClosed}
          >
            <CloseIcon />
          </Preview.CloseButton>
        </Preview.Header>
        <Preview.Picker>
          <Preview.PickerButton>Browse</Preview.PickerButton>
          <Preview.PickerInput
            type="file"
            accept="image/*"
            onChange={(event: any) => {
              const file = Array.from(event.target.files).pop();
              this.props.onChangedImage(file as File);
            }}
          />
        </Preview.Picker>
        <Preview.Action>
          <Preview.ActionText
            onChange={this.handleCaptionChange}
            onKeyDown={this.handleCaptionKeyDown}
            placeholder="Add your caption..."
          />
          <Preview.ActionButton
            type="button"
            color="secondary"
            onClick={(event: any) => {
              event.preventDefault();
              this.props.onSubmitted(this.state.caption || '');
              this.setState({ caption: undefined });
            }}
          >
            <SendIcon />
          </Preview.ActionButton>
        </Preview.Action>
      </Preview.Main>
    );
  }
}

export default QismoPreviewUpload;
