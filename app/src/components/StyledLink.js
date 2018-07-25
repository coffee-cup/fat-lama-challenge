import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colours } from '../styles.js';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${colours.primary};

  &:visited {
    color: ${colours.primary};
  }
`;

export default StyledLink;
