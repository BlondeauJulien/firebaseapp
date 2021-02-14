import  { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useFolder } from '../hooks/useFolder';

import Folder from './Folder';
import AddFolderButton from './AddFolderButton';
import Navbar from './Navbar';

const Dashboard = () => {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);


  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">

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
