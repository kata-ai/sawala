import styled, { keyframes } from 'styled-components';
import { Button as KataButton } from '@kata-kit/button';
import { variables } from '@kata-kit/theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0,20%,0)
  }
  to {
    opacity: 1;
    transform: none
  }
`;

export const Index = styled.div`
  flex-grow: 0;
  width: 100%;
  height: 64px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid #e2e6e8;
`;

export const Content = styled.div`
  margin: 20px 26px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Action = styled.div`
  flex-grow: 0;
  margin: 0;
  padding: 0 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Comment = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const Textarea = styled.textarea`
  font-size: 13px;
  line-height: 24px;
  border: none;
  overflow: auto;
  outline: none;
  box-shadow: none;
  resize: none;
  background: transparent;
  margin: 6px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::placeholder {
    color: #949a9d;
  }
`;

export const Button = styled(KataButton)`
  border: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  background-color: transparent !important;

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
    box-shadow: none !important;

    i {
      background-color: #006fe6 !important;
    }
  }
`;

export const Preview = styled.div<{ show?: boolean }>`
  position: absolute;
  bottom: 64px;
  right: 0;
  background-color: #ffffff;
  margin-bottom: 0;
  padding: 16px 24px;
  order: 1;
  width: calc(100% - 280px);
  height: 80px;
  border-top: 1px solid #e2e6e8;
  display: ${props => (props.show ? 'flex' : 'none')};
  animation: ${fadeInUp} ${variables.transitions.transitionNormal} ease-out;
  box-shadow: 0 -8px 16px hsla(0, 0%, 78%, 0.2);
`;

export const PreviewButton = styled(KataButton)`
  border: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  background-color: #3ace01 !important;
  height: 32px !important;
  width: 32px !important;
  cursor: default !important;

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const CloseButton = styled(PreviewButton)`
  background-color: transparent !important;
  margin-left: auto;
  cursor: pointer !important;
`;

export const PreviewContent = styled.div`
  display: flex;
  margin: 0 16px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const h4 = styled.h4`
  line-height: 24px;
  font-size: 13px;
  font-weight: 400;
  color: #24282d;
  margin: 0;
`;

export const p = styled.p`
  line-height: 24px;
  font-size: 13px;
  font-weight: 300;
  color: #949a9d;
  margin: 0;
  overflow: hidden;
`;
