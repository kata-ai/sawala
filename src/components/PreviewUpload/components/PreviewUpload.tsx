import styled from 'styled-components';

import { Button as KataButton } from '@kata-kit/button';

export const Main = styled.div`
  width: calc(100% - 280px);
  position: absolute;
  min-height: 160px;
  background: #ffffff;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  opacity: 1;
  display: flex;
  bottom: 0;
  left: auto;
  right: auto;
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
  cursor: pointer !important;
`;
export const Action = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 12px 20px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  color: #666;
  width: 100%;
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
export const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 96px;
  margin: 0;
  box-shadow: 0 -8px 16px hsla(0, 0%, 78%, 0.2);
`;
export const ThumbnailImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 98px;
`;
export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
`;
export const ThumbnailInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
`;
export const Title = styled.h4`
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  color: #24282d;
  margin: 0;
  padding: 0;
  letter-spacing: 0.2px;
`;
export const Subtitle = styled.div`
  flex: 1;
  font-size: 11px;
  line-height: 24px;
  font-weight: 500;
  color: #979797;
  letter-spacing: 0.2px;
`;
export const ThumbnailProgress = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  flex: 0 74px;
`;
