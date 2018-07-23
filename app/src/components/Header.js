import React from 'react';
import styled from 'styled-components';
import { colours } from '../styles.js';

const Wrapper = styled.div`
  font-size: 1.5em;
  min-height: 5rem;
  text-align: center;
  background-color: ${colours.accent};
`;

const Header = () => <Wrapper />;

export default Header;
