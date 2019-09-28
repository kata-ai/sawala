import styled from 'styled-components';

const Icon = styled.i<{ image: string; size?: string; color?: string }>`
  display: inline-block;
  vertical-align: middle;
  mask: url(../images/${props => props.image}.svg) no-repeat center;
  -webkit-mask: url(../images/${props => props.image}.svg) no-repeat center;
  height: ${props => (props.size ? props.size : '16px')} !important;
  width: ${props => (props.size ? props.size : '16px')} !important;
  background-color: ${props => (props.color ? props.color : '#ffffff')};
`;

export default Icon;
