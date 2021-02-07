import  { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';

import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <AddFolderButton></AddFolderButton>
      </Container>
    </Fragment>
  )
}

export default Dashboard;
