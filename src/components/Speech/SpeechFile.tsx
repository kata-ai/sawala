import React from 'react';
import Speech from './components';
import { FileIcon } from 'icons';

interface Props {
  path: string;
  isMyComment: boolean;
}

export class SpeechFile extends React.PureComponent<Props> {
  render() {
    const { path, isMyComment } = this.props;
    return (
      <Speech.Attachment>
        <Speech.AttachmentFile
          href={path}
          target="_blank"
          isMyComment={isMyComment}
        >
          <FileIcon fill={this.getIconColor()} />
          {this.getFileName(path)}
        </Speech.AttachmentFile>
      </Speech.Attachment>
    );
  }

  private getIconColor = () => {
    return this.props.isMyComment ? '#FFFFFF' : '#949A9D';
  };

  private getFileName = (path: string) => {
    if (path) {
      return path.substring(path.lastIndexOf('/') + 1);
    }
    return '';
  };
}
