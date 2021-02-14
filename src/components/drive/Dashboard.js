import  { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';

import { useFolder } from '../../hooks/useFolder';

import Folder from './Folder';
import AddFolderButton from './AddFolderButton';
import Navbar from './Navbar';
import FolderBreadCrumbs from './FolderBreadCrumbs';

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders } = useFolder(folderId, state.folder);


  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder}></FolderBreadCrumbs>
          <AddFolderButton currentFolder={folder}></AddFolderButton>  
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap"> 
            {childFolders.map(childFolder => ( 
              <div key={childFolder.id} style={{ maxWidth: '250px'}} className="p-2">
                <Folder folder={childFolder} />
              </div>

            ))}
          </div>
        )}
      </Container>
    </Fragment>
  )
}

export default Dashboard;
