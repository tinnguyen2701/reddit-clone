import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    a {
      text-decoration: none;
      color: ${props => props.theme.color};
    }
  }
`;
export default () => (
  <Div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  </Div>
);
