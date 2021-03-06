import { Fragment, useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const AddFolderButton = ({ currentFolder }) => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(currentFolder === null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ 
        name: currentFolder.name, 
        id:currentFolder.id 
      })
    }
    
    //Create a folder in the DB
    database.folders.add({
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
      createdAt: database.getCurrentTimeStamp()
    });
    setName("");
    closeModal();
  }

  return (
    <Fragment>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
            <Button type="submit" variant="success" onClick={closeModal}>Add Folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default AddFolderButton;
