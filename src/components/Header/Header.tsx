import React from 'react';

import { withQismoSDKProps } from 'containers/withQismoSDK';

import Header from './components';

import { parseAsJSON, getAvatar } from 'libs/utils';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from '@kata-kit/dropdown';
import { MoreIcon } from 'icons';
import { AVATAR } from 'default';

export enum AssignmentType {
  Add = 'add',
  Remove = 'remove'
}

interface InnerProps {
  onSwitchBot: Function;
  onOpenResolved: () => void;
  onOpenDetail: () => void;
  onOpenAssignment(type: AssignmentType): void;
}

type HeaderProps = InnerProps & withQismoSDKProps;

interface HeaderStates {}

class QismoHeader extends React.Component<HeaderProps, HeaderStates> {
  render() {
    const {
      selected,
      onOpenDetail,
      onOpenAssignment,
      onOpenResolved
    } = this.props;

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
          <Header.ItemAction>
            {!parseAsJSON(selected.options)['is_resolved'] && (
              <Header.ButtonResolved
                type="button"
                size="sm"
                onClick={() => onOpenResolved()}
              >
                Resolved
              </Header.ButtonResolved>
            )}
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
                <DropdownItem
                  onClick={() => onOpenAssignment(AssignmentType.Add)}
                >
                  Assign agent
                </DropdownItem>
                <DropdownItem
                  onClick={() => onOpenAssignment(AssignmentType.Remove)}
                >
                  Remove agent
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Header.ItemAction>
        </Header.Item>
      </Header.Header>
    ) : null;
  }

  private addDefaultSrc(event: any) {
    event.target.src = AVATAR;
  }
}

export default QismoHeader;
