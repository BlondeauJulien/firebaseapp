import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        Content
      </Container>
    </Fragment>
  )
}

export default Dashboard;
