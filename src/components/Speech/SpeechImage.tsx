import React, { ImgHTMLAttributes } from 'react';
import Speech from './components';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  onSelectImage: (image: string) => void;
}

export class SpeechImage extends React.PureComponent<Props> {
  render() {
    const { src } = this.props;
    return (
      <Speech.Attachment>
        <Speech.Image
          {...this.props}
          onClick={() => {
            if (src) {
              this.props.onSelectImage(src);
            }
          }}
        />
      </Speech.Attachment>
    );
  }
}
