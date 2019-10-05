import styled, { css, keyframes } from 'styled-components';

import { variables } from '@kata-kit/theme';
import { Button as KataButton } from '@kata-kit/button';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%,0,0)
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

export const Index = styled.div<{ showPreview?: boolean }>`
  flex-grow: 1;
  width: 100%;
  height: ${props =>
    props.showPreview ? 'calc(100% - 208px)' : 'calc(100% - 128px)'};
  padding: 8px 24px;
  margin: 0;
  background-color: ${variables.colors.gray10};
  overflow: hidden;
  overflow-y: auto;
`;

export const Content = styled.div`
  margin: 12px 24px;
  padding: 0;
`;

export const Info = styled.div<{ beginning?: boolean }>`
  margin: 24px 0 8px;
  padding: 4px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${props =>
    props.beginning &&
    css`
      margin: 8px 0;
    `}
`;

export const Span = styled.span`
  line-height: 24px;
  font-size: 11px;
  font-weight: 500;
  color: #979797;
`;

export const Date = styled(Span)`
  padding: 0 8px;
  color: ${variables.colors.white};
  background-color: ${variables.colors.gray70};
  border-radius: 2px;
`;

export const Notif = styled(Span)`
  padding: 0 8px;
  color: ${variables.colors.gray50};
  background-color: transparent;
  border: 1px solid ${variables.colors.gray30};
  border-radius: 2px;
`;

export const ChatAction = styled.div<{ position: 'left' | 'right' }>`
  display: none;
  z-index: 5;
  margin-left: ${props => (props.position === 'left' ? '8px' : 0)};
  margin-right: ${props => (props.position === 'right' ? '8px' : 0)};
  order: ${props => (props.position === 'right' ? -1 : 0)};
  animation: ${fadeIn} ${variables.transitions.transitionNormal} ease-out;
  transition: background ${variables.transitions.transitionNormal} ease-out;

  .dropdown-menu {
    left: auto;
    right: 0;
  }
`;

export const Button = styled(KataButton)`
  border: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  background-color: ${variables.colors.gray70} !important;
  height: 32px !important;
  width: 32px !important;

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const ChatTime = styled.div<{ position?: 'left' | 'right' }>`
  background-color: transparent;
  line-height: 24px;
  font-size: 11px;
  font-weight: 400;
  color: #979797;
  margin-left: ${props => (props.position === 'left' ? '8px' : '0')};
  margin-right: ${props => (props.position === 'right' ? '8px' : '0')};
  order: ${props => (props.position === 'right' ? '-1' : '0')};
  transition: background ${variables.transitions.transitionNormal} ease-out;
`;

export const ChatTick = styled.div`
  background-color: transparent;
  margin-right: 8px;
  order: -2;
  transition: background ${variables.transitions.transitionNormal} ease-out;
`;

export const Chat = styled.div<{
  first?: boolean;
  position?: 'left' | 'right';
  inactive?: boolean;
  isSystem?: boolean;
}>`
  width: 50wh;
  padding: 4px 0;
  display: flex;
  justify-content: ${props =>
    props.position === 'right' ? 'flex-end' : 'flex-start'};
  align-items: flex-start;

  ${props =>
    props.first &&
    css`
      margin-top: 24px;
    `}

    ${props =>
      props.isSystem &&
      css`
        width: 100wh;
        align-items: center;
        justify-content: center;
      `}

  ${props =>
    !props.inactive &&
    css`
      &:hover,
      &:focus,
      &:active {
        ${ChatAction} {
          display: inline-block;
        }
        ${ChatTime} {
          display: none;
        }
        ${ChatTick} {
          display: none;
        }
      }
    `}
`;

export const ChatImage = styled.div<{ position?: 'left' | 'right' }>`
  margin: 0 16px 0 0;
  padding: 0;
  flex-grow: 0;

  ${props =>
    props.position === 'right' &&
    css`
      order: 1;
      margin: 0 0 0 16px;
    `}
`;

export const Image = styled.img<{ size?: number }>`
  height: ${props => (props.size ? props.size : 40)}px;
  width: ${props => (props.size ? props.size : 40)}px;
  border-radius: 50%;
`;

export const ChatBaloon = styled.div<{
  first?: boolean;
  position?: 'left' | 'right';
}>`
  background: ${props => (props.position === 'right' ? '#006fe6' : '#ffffff')};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 8px;
  min-height: 40px;
  max-width: 269px;
  position: relative;
  margin-left: ${props =>
    !props.first && props.position === 'left' ? '55px' : '0'};
  margin-right: ${props =>
    !props.first && props.position === 'right' ? '55px' : '0'};

  ${props =>
    props.first &&
    css`
      &:after {
        content: '';
        position: absolute;
        top: 4%;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        left: 0;
        border-right-color: ${variables.colors.white};
        border-left: 0;
        margin-top: 10px;
        margin-left: -8px;
      }
    `}

  ${props =>
    props.position === 'right' &&
    css`
      &:after {
        left: inherit;
        right: 0;
        border-left: inherit;
        border: 8px solid transparent;
        border-left-color: ${variables.colors.kataBlue};
        border-right: 0;
        margin-right: -8px;
      }
    `}

  p {
    line-height: 24px;
    font-size: 13px;
    font-weight: 300;
    color: ${props => (props.position === 'right' ? '#ffffff' : '#24282d')};
    padding: 0;
    margin: 0;
    text-align: left;
  }
`;

export const ButtonMore = styled(KataButton)`
  padding: 0 8px;
  color: ${variables.colors.white} !important;
  background-color: ${variables.colors.darkKataBlue} !important;
  border-radius: 4px;
  margin: 28px 0;

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;
