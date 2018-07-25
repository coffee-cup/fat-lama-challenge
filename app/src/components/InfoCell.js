import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;

  > div {
    width: 20rem;
  }

  > span:first-child {
    display: inline-block;
    min-width: 6rem;
    padding-right: 1rem;
    font-weight: bold;
  }
`;

const InfoCell = ({ name, children }) => (
  <Row>
    <span>{name}</span>
    {children}
  </Row>
);

export default InfoCell;
