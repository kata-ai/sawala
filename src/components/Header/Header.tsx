import React from 'react';

import { withQismoSDKProps } from 'containers/withQismoSDK';

import Header from './components';

import { getAvatar } from 'libs/utils';

import { AVATAR } from 'default';

export enum AssignmentType {
  Add = 'add',
  Remove = 'remove'
}

interface InnerProps {
  headerComponent?: React.ReactElement;
}

type HeaderProps = InnerProps & withQismoSDKProps;

interface HeaderStates {}

class QismoHeader extends React.Component<HeaderProps, HeaderStates> {
  render() {
    const { selected, headerComponent } = this.props;

    return selected ? (
      <Header.Header key={selected.id}>
        <Header.Item>
          <Header.ItemImage>
            <Header.Image
              onError={this.addDefaultSrc}
              src={getAvatar(selected.avatar)}
              alt="avatar"
            />
          </Header.ItemImage>
          <Header.ItemUser>
            <Header.UserName>{selected.name}</Header.UserName>
            <Header.UserAlias>{selected.custom_subtitle}</Header.UserAlias>
          </Header.ItemUser>
          {headerComponent && headerComponent}
        </Header.Item>
      </Header.Header>
    ) : null;
  }

  private addDefaultSrc(event: any) {
    event.target.src = AVATAR;
  }
}

export default QismoHeader;
