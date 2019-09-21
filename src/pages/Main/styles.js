import styled, { keyframes, css } from 'styled-components';
import { primaryColor } from '../../styles/variables';

export const Form = styled.form.attrs(props => ({
  error: props.error,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    ${({ error }) =>
      error &&
      `
      border: 1px solid #D8000C;
    `}
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: ${primaryColor};
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
    opacity: 0.6;
  `}

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style: none;
  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      text-decoration: none;
      color: ${primaryColor};
    }
  }
`;
