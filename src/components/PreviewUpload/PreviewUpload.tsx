import React from 'react';

import Preview from './components';
import { SendIcon, CloseIcon } from 'icons';

import { Circle } from '@kata-kit/loading';

import { formatBytes } from 'libs/utils';
import { PreviewImage } from 'types';

interface PreviewProps {
  background?: PreviewImage;
  onUploadImage: (file: File) => Promise<string>;
  onSubmitImage: (url: string, file: File, caption: string) => Promise<any>;
  onClearPreview: () => Promise<boolean>;
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
    const { background } = this.props;
    const file = background && background.file;
    const serverURL = background && background.serverURL;
    if (file && !serverURL) {
      this.props.onUploadImage(file).then(() => {
        // do nothing
      });
    }
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
    const { background, onSubmitImage, onClearPreview } = this.props;
    const file = background && background.file;
    const serverURL = background && background.serverURL;
    if (file && serverURL) {
      onSubmitImage(serverURL, file, caption).then(() => {
        onClearPreview().finally(() => {
          this.setState({ ...this.defaultStates });
        });
      });
    }
  };

  handleCloseImage = () => {
    this.props.onClearPreview().finally(() => {
      this.setState({ ...this.defaultStates });
    });
  };

  render() {
    const { background } = this.props;
    const file = background && background.file;
    const localURL = background && background.localURL;
    const serverURL = background && background.serverURL;
    return (
      <Preview.Main>
        <Preview.Thumbnail>
          <Preview.ThumbnailImage>
            <Preview.Image src={localURL} alt="thumbnail" />
          </Preview.ThumbnailImage>
          <Preview.ThumbnailInfo>
            {file && (
              <>
                <Preview.Title>{file.name}</Preview.Title>
                <Preview.Subtitle>{formatBytes(file.size)}</Preview.Subtitle>
              </>
            )}
          </Preview.ThumbnailInfo>
          <Preview.ThumbnailProgress>
            {!serverURL ? (
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
            disabled={!serverURL}
          >
            <SendIcon fill={!serverURL ? '#C2C7C8' : '#006FE6'} />
          </Preview.ActionButton>
        </Preview.Action>
      </Preview.Main>
    );
  }
}

export default QismoPreviewUpload;
