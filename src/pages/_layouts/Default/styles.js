import styled from 'styled-components';

import { Container as ContainerMt } from '@material-ui/core';

export const Content = styled.div`
  height: 100%;
  width: 100%;
  background: #f9f9f9;
  display: flex;
`;

export const Container = styled(ContainerMt)`
  margin: 0;
  padding: 50px 27px !important;

  @media (max-width: 600px) {
    padding: 30px 10px !important;
  }
`;
