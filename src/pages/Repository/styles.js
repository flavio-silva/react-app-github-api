import styled from 'styled-components';

import { primaryColor } from '../../styles/variables';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    color: #666;
    line-height: 21px;
    text-align: center;
    max-width: 400px;
  }
  a {
    color: ${primaryColor};
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          &:hover {
            color: ${primaryColor};
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: bold;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Filter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  label {
    input {
      margin-right: 5px;
    }
  }
`;

export const Pagination = styled.div.attrs(props => ({
  currentPage: props.currentPage,
}))`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  button {
    padding: 10px 15px;
    background: ${primaryColor};
    color: #fff;
    font-weight: bold;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    &:hover {
      background: #a0c7cf;
    }

    & + button {
      margin-left: 10px;
    }
    &:first-child {
      ${({ currentPage }) =>
        currentPage === 1 &&
        `cursor: not-allowed;
      opacity: 0.6;
    `}
    }
  }
`;
