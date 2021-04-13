import { filesConstants } from "./../_constants"
import {fetchAllFiles, 
  fetchSearch, 
  fetchDeleteFile, 
  fetchDownloadFile, 
  fetchRenameFile, 
  fetchUploadFile} from './../_services/fetchServices'

export const getAllAsync = (folderName) => dispatch => {

    dispatch({ type : filesConstants.FETCH_FILES_PENDING });

    fetchAllFiles(folderName)
    .then(res => dispatch({ type : filesConstants.FETCH_FILES_SUCCESS, res: res}))
    .catch(err=>dispatch({type: filesConstants.FETCH_FILES_FAILURE}));
}
export const searchByName = (searchKey) => dispatch => {

  dispatch({ type : filesConstants.FETCH_FILES_PENDING });

  fetchSearch(searchKey)
  .then(res => dispatch({ type : filesConstants.FETCH_FILES_SUCCESS, res: res}))
  .catch(err=>dispatch({type: filesConstants.FETCH_FILES_FAILURE}));
}

export const deleteItem = id => dispatch => {

  dispatch({ type : filesConstants.FETCH_FILES_PENDING });

  fetchDeleteFile(id)
  .then(() => dispatch({type: filesConstants.DELETE, id: id}));
}

export const renameItem = (id, newName) => dispatch => {

  dispatch({ type : filesConstants.FETCH_FILES_PENDING });

  fetchRenameFile(id, newName)
  .then(() => dispatch({type: filesConstants.RENAME, id: id, newName: newName}));
}

export const downloadItem = id => dispatch => {

  dispatch({ type : filesConstants.FETCH_FILES_PENDING });

  fetchDownloadFile()
  .then((resp) => {
    const url = window.URL.createObjectURL(new Blob([resp]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', "download.txt");
    document.body.appendChild(link);
    link.click();
    dispatch({type: filesConstants.DOWNLOAD, id: id});
  });
}

export const uploadItem = file => dispatch => {
  dispatch({type : filesConstants.FETCH_FILES_PENDING});
 
  fetchUploadFile(file)
  .then((resp) => dispatch({type: filesConstants.UPLOAD, file: file}))
}