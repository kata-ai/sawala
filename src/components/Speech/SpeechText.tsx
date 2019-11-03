import React from 'react';

import { Comment } from 'types';
import { checkValidImage } from 'libs/utils';

import { SpeechFile } from './SpeechFile';
import { SpeechImage } from './SpeechImage';

interface Props {
  isMyComment: boolean;
  comment: Comment;
  onSelectImage: (image: string) => void;
}

export class SpeechText extends React.PureComponent<Props> {
  renderImage = (path: string) => {
    return (
      <SpeechImage
        src={path}
        alt="image"
        onSelectImage={this.props.onSelectImage}
      />
    );
  };

  render() {
    const { message } = this.props.comment;
    const path = this.getFileFromText(message);

    if (!path) {
      return <p>{message}</p>;
    }

    if (this.isImage(path)) {
      return this.renderImage(path);
    }

    const checkImage = checkValidImage(path);
    checkImage.then(
      (re: any) => {
        if (re.status === 'ok') {
          return this.renderImage(path);
        }
        console.log('check image', {
          path,
          status: re.status,
          isImage: this.isImage(path)
        });
        return <SpeechFile path={path} isMyComment={this.props.isMyComment} />;
      },
      error => console.log('check image unknown error', error)
    );

    return null;
  }

  // Get file from text message
  private getFileFromText = (text: string): string => {
    const regex = RegExp(/(\[file\])(.*?)(\[\/file\])/g);
    const match = regex.exec(text);
    if (match) {
      return match[2].trim();
    }
    return '';
  };

  private isImage = (path: string) => {
    return path.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null;
  };
}
