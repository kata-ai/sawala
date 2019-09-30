import React from 'react';

import { Room } from 'types';

import Header from './components';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from '@kata-kit/dropdown';
import { MoreIcon } from 'icons';

interface HeaderProps {
  room?: Room;
  onSwitchBot: Function;
  onOpenDetail: Function;
  onOpenAssignment(type: 'add' | 'remove'): void;
}

interface HeaderStates {}

class QismoHeader extends React.Component<HeaderProps, HeaderStates> {
  submitResolve = (data: any) => {
    console.log('submit filter', data); // tslint:disable-line
  };

  openResolve = () => {
    // tslint:disable-next-line: no-console
    console.log('handle open resolve here.');
  };

  render() {
    const { room, onOpenDetail, onOpenAssignment } = this.props;

    return room ? (
      <Header.Header key={room.id}>
        <Header.Item>
          <Header.ItemImage>
            <Header.Image src={room.avatar} alt="avatar" />
          </Header.ItemImage>
          <Header.ItemUser>
            <Header.UserName>{room.name}</Header.UserName>
            <Header.UserAlias>{room.custom_subtitle}</Header.UserAlias>
          </Header.ItemUser>
          <Header.ItemAction>
            <Header.ButtonResolved
              type="button"
              size="sm"
              onClick={this.openResolve}
            >
              Resolved
            </Header.ButtonResolved>
            <Dropdown dropDirection="down">
              <DropdownToggle caret={false}>
                <Header.Button type="button" color="secondary" size="sm" isIcon>
                  <MoreIcon />
                </Header.Button>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                <DropdownItem onClick={() => onOpenDetail()}>
                  Chat details
                </DropdownItem>
                <DropdownItem onClick={() => onOpenAssignment('add')}>
                  Assign agent
                </DropdownItem>
                <DropdownItem onClick={() => onOpenAssignment('remove')}>
                  Remove agent
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Header.ItemAction>
        </Header.Item>
      </Header.Header>
    ) : null;
  }
}

export default QismoHeader;
