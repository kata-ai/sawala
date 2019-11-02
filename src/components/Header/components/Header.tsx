import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 12px 24px;
  margin: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e6e8;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  height: 64px;
  padding: 12px 0;
  margin: 0;
`;

export const ItemImage = styled.div`
  margin: 0;
  padding: 0;
  flex-grow: 0;
  cursor: pointer;
`;

export const Image = styled.img<{ size?: number }>`
  height: ${props => (props.size ? props.size : 40)}px;
  width: ${props => (props.size ? props.size : 40)}px;
  border-radius: 50%;
`;

export const ItemUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 0 0 8px;
  padding: 0;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  color: #24282d;
`;

export const UserAlias = styled.span`
  font-size: 13px;
  font-weight: 300;
  line-height: 16px;
  color: #484c4f;
`;
