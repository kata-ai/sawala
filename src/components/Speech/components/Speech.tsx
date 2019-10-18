import styled from 'styled-components';

import { variables } from '@kata-kit/theme';

export const Box = styled.div`
  overflow: hidden;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre;
`;

export const Attachment = styled.div`
  padding: 4px;
`;

export const Image = styled.img`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  height: auto;
  max-width: 152px;
`;

export const Info = styled.div`
  margin: 0;
  padding: 4px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const System = styled.span`
  padding: 0 8px;
  color: ${variables.colors.gray60};
  background-color: ${variables.colors.gray30};
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
`;

export const Reply = styled.div`
  border-left: 5px solid ${variables.colors.lightCobalt};
  margin-bottom: 8px;
  background: ${variables.colors.gray10};
  color: ${variables.colors.gray60};
  padding: 4px 8px;
  border-radius: 5px;

  p {
    color: ${variables.colors.gray60};
    font-weight: 400;
  }
`;

export const ReplyImage = styled.img``;
