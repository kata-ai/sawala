import styled, { css } from 'styled-components';

import { Button as KataButton } from '@kata-kit/button';

export const Main = styled.div<{ background?: string }>`
  position: absolute;
  top: 0;
  left: 280px;
  width: 100%;
  height: 100%;
  background: ${props =>
    props.background
      ? `url(${
          props.background
        }) center center / cover no-repeat rgb(255, 255, 255)`
      : '#fff'};
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  z-index: 999;
  opacity: 0;
  display: none;

  ${props =>
    props.background &&
    css`
      opacity: 1;
      display: flex;
    `}
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
  padding: 8px 16px;
  color: #666;
  align-items: center;
  margin: 0;
  width: calc(100% - 280px);
`;
export const HeaderTitle = styled.div`
  align-self: flex-start;
  flex: 1;
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  h4 {
    margin: 0;
    font-size: 15px;
  }
  span {
    font-size: 13px;
  }
`;
export const Button = styled(KataButton)`
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

export const CloseButton = styled(Button)`
  background-color: transparent !important;
  margin-left: auto;
  cursor: pointer !important;
`;

export const Picker = styled.label`
  display: flex;
  justify-content: center;
  align-content: center;
  width: calc(100% - 280px);
  /* margin-left: -280px; */
`;
export const PickerButton = styled.div`
  border: 1px solid #979797;
  color: gray;
  background-color: #fff;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  flex: 0 0 auto;
  max-width: 100px;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s ease-out;
`;
export const PickerInput = styled.input`
  display: none;
`;
export const Action = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  color: #666;
  width: calc(100% - 280px);
`;
export const ActionText = styled.input`
  flex: 1;
  margin-right: 10px;
  border: 0;
  outline: none;
  font-size: 15px;
`;
export const ActionButton = styled(Button)`
  background-color: transparent !important;
  height: 40px !important;
  width: 40px !important;
  cursor: pointer !important;

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
