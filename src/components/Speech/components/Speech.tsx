import styled from 'styled-components';

import { variables } from '@kata-kit/theme';

export const Box = styled.div`
  overflow: hidden;
  overflow-y: auto;
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const Attachment = styled.div`
  padding: 4px;
`;

export const AttachmentFile = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  color: ${variables.colors.gray60};
  background-color: ${variables.colors.gray10};
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;

  svg {
    margin-right: 8px;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
    box-shadow: none;
  }
`;

export const Image = styled.img`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  height: auto;
  max-width: 152px;
`;

export const Info = styled.div`
  margin: 24px 0 8px;
  padding: 4px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Span = styled.span`
  line-height: 24px;
  font-size: 11px;
  font-weight: 500;
  color: #979797;
  letter-spacing: 0.2px;
`;

export const System = styled(Span)`
  padding: 0 8px;
  color: ${variables.colors.gray50};
  background-color: transparent;
  border: 1px solid ${variables.colors.gray30};
  border-radius: 2px;
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
