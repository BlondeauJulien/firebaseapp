import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { storage, database } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

const AddFileButton = ({ currentFolder }) => {
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if(currentFolder == null || file == null) return;

    const currentFolderPath = currentFolder.path.map(folder => {
      return folder.id;
    }).join('/')


    const filePath = 
      currentFolder === ROOT_FOLDER 
        ? `${currentFolderPath}/${file.name}`
        : `${currentFolderPath}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
    .ref(`/files/${currentUser.uid}/${filePath}`)
    .put(file);

    uploadTask.on('state_changed', snapshot => {

    }, () => {

    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        database.files.add({
          url: url,
          name: file.name,
          createdAt: database.getCurrentTimeStamp(),
          folderId: currentFolder.id,
          userId: currentUser.uid
        })
      });
    });
  }
  
  return (
    <label className="btn btn-outline-success btn-sm m-0 mr-2">
      <FontAwesomeIcon icon={faFileUpload} />
      <input 
        type="file" 
        onChange={handleUpload} 
        style={{ opacity: 0, position: 'absolute', left: '-9999px'}}
      />
    </label>
  )
}

export default AddFileButton;