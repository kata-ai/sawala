import styled, { keyframes } from 'styled-components';
import { variables } from '@kata-kit/theme';

type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

type FlexContentType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';

type FlexDirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse';

const cardFadeIn = keyframes`
  from {
    transform: translateY(5px);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Index = styled.div<{
  content?: FlexContentType;
  items?: FlexAlignType;
  direction?: FlexDirectionType;
  padding?: string;
  margin?: string;
}>`
  display: flex;
  justify-content: ${props => (props.content ? props.content : 'center')};
  align-items: ${props => (props.items ? props.items : 'center')};
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  padding: ${props => (props.padding ? props.padding : 0)};
  margin: ${props => (props.margin ? props.margin : 0)};
`;

export const Main = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  animation-name: ${cardFadeIn};
  animation-duration: ${variables.transitions.transitionNormal};
  animation-timing-function: ${variables.transitions.transitionEasing};
  transition-property: all;
  transition-duration: ${variables.transitions.transitionNormal};
  transition-timing-function: ${variables.transitions.transitionEasing};
  overflow: hidden;
  overflow-y: hidden;
`;
