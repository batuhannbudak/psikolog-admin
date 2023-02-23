import Styled, { keyframes } from 'styled-components';

export const LoadingDotsWrapper = Styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const dotPulse = keyframes`
  0% {
    opacity: 0.3;
    transform: scale(0.5);
  }

  50% {
    opacity: 0.8;
    transform: scale(1);
  }

  100% {
    opacity: 0.3;
    transform: scale(0.5);
  }
`;

export const LoadingDotsCircle = Styled.div`
  border-radius: 50%;
  opacity: 0.3;
  background-color: ${props => props.backgroundColor};
  animation: ${dotPulse} ease-in-out 1.2s infinite both;

  .small & {
    width: 5px;
    height: 5px;
    margin-right: 2px;
  }

  .medium & {
    width: 8px;
    height: 8px;
    margin-right: 4px;
  }

  .large & {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }

  &:nth-child(2) { animation-delay: .3s; }
  &:nth-child(3) { animation-delay: .6s; }
`;
