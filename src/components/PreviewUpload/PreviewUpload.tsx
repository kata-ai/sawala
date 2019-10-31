import React from 'react';

import Preview from './components';
import { SendIcon, CloseIcon } from 'icons';

import { Circle } from '@kata-kit/loading';

import { formatBytes } from 'libs/utils';

interface PreviewProps {
  background?: string;
  onUploadImage: (file: File) => Promise<string>;
  currentFile: File;
  imageURL?: string;
  onSubmitImage: (url: string, file: File, caption: string) => Promise<any>;
  onClearPreview: () => void;
}

interface PreviewStates {
  caption: string;
}

class QismoPreviewUpload extends React.Component<PreviewProps, PreviewStates> {
  defaultStates: PreviewStates = {
    caption: ''
  };

  constructor(props: PreviewProps) {
    super(props);

    this.state = this.defaultStates;
  }

  componentDidMount() {
    this.props.onUploadImage(this.props.currentFile).then(() => {
      // do nothing
    });
  }

  handleCaptionChange = (event: any) => {
    this.setState({ caption: event.target.value });
  };

  handleCaptionKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { caption } = this.state;
    const { imageURL, currentFile, onSubmitImage, onClearPreview } = this.props;
    if (imageURL && currentFile) {
      onSubmitImage(imageURL, currentFile, caption).then(() => {
        onClearPreview();
        this.setState({ ...this.defaultStates });
      });
    }
  };

  handleCloseImage = () => {
    this.setState({ ...this.defaultStates });
    this.props.onClearPreview();
  };

  render() {
    const { currentFile, imageURL } = this.props;
    return (
      <Preview.Main>
        <Preview.Thumbnail>
          <Preview.ThumbnailImage>
            <Preview.Image src={this.props.background} alt="thumbnail" />
          </Preview.ThumbnailImage>
          <Preview.ThumbnailInfo>
            {currentFile && (
              <>
                <Preview.Title>{currentFile.name}</Preview.Title>
                <Preview.Subtitle>
                  {formatBytes(currentFile.size)}
                </Preview.Subtitle>
              </>
            )}
          </Preview.ThumbnailInfo>
          <Preview.ThumbnailProgress>
            {!imageURL ? (
              <Circle />
            ) : (
              <Preview.CloseButton
                type="button"
                color="secondary"
                onClick={this.handleCloseImage}
                isIcon
              >
                <CloseIcon />
              </Preview.CloseButton>
            )}
          </Preview.ThumbnailProgress>
        </Preview.Thumbnail>
        <Preview.Action>
          <Preview.ActionText
            onChange={this.handleCaptionChange}
            onKeyDown={this.handleCaptionKeyDown}
            placeholder="Add your caption..."
          />
          <Preview.ActionButton
            type="button"
            color="secondary"
            size="sm"
            onClick={(event: any) => {
              event.preventDefault();
              this.handleSubmit();
            }}
            disabled={!imageURL}
          >
            <SendIcon fill={!imageURL ? '#C2C7C8' : '#006FE6'} />
          </Preview.ActionButton>
        </Preview.Action>
      </Preview.Main>
    );
  }
}

export default QismoPreviewUpload;
