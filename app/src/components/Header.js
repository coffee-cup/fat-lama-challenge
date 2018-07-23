import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colours } from '../styles.js';

const BlankLink = styled(Link)`
  text-decoration: none;
  color: ${colours.dark};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  min-height: 8rem;
  text-align: center;
  border-bottom: solid 4px ${colours.primary};

  > h1 {
    margin: 0;
  }
`;

const Header = () => (
  <Wrapper>
    <BlankLink to="/">
      <h1>Fat Lama Frontend Challenge</h1>
    </BlankLink>
  </Wrapper>
);

export default Header;
