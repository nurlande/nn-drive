import { filesConstants } from "./../_constants"

import {xhrCreator} from './../_services/fetchServices';

export const getAllAsync = (folderId) => dispatch => {

    dispatch({ type : filesConstants.FETCH_FILES_PENDING });

    let user = JSON.parse(localStorage.getItem("user"));

    let id = folderId ? folderId : user.username

    var data = null;
    let xhr = xhrCreator("http://localhost:8082/folder/" +id+ "/content", "get", );
    xhr.send(data);

    xhr.addEventListener("readystatechange", function () {  
        if (this.readyState === 4) {
            let resp = JSON.parse(this.responseText);
            if(this.status === 200) {
              dispatch({ type : filesConstants.FETCH_FILES_SUCCESS, res: resp})
            } else {
              dispatch({type : filesConstants.FETCH_FILES_FAILURE, res: resp.status})
            }
        }
    });
}


export const deleteItem = id => dispatch => {

  dispatch({ type : filesConstants.FETCH_FILES_PENDING });
  
  var data = JSON.stringify({
    "fileIds": [id]
  });
  console.log(data);
  let xhr = xhrCreator("http://localhost:8082/files/delete", "DELETE", );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  
  xhr.addEventListener("readystatechange", function () {  
    if (this.readyState === 4) {
      console.log(this.status)
      if(this.status === 200) {
        dispatch({ type : "DELETE_SUCCESS"})
      } else {
        dispatch({type : "DELETE_ERROR"})
      }
      getAllAsync();
    }
  });
}

export const renameItem = (id, newName) => dispatch => {
  
  dispatch({ type : filesConstants.FETCH_FILES_PENDING });
  
  var data = null;
  let xhr = xhrCreator("http://localhost:8082/file/"+id+"/rename/" +newName, "post", );
  xhr.send(data);
  
  xhr.addEventListener("readystatechange", function () {  
    if (this.readyState === 4) {
      let resp = JSON.parse(this.responseText);
      console.log(resp);
      if(this.status===200) {
        dispatch({type: "RENAME_SUCCESS"})
      } else {
        dispatch({type: "RENAME_ERROR"})
      }
      getAllAsync();
    }
  });
}

export const downloadItem = file => dispatch => {
  
  dispatch({ type : filesConstants.FETCH_FILES_PENDING });
  
  let xhr = xhrCreator("http://localhost:8082/file/download/"+ file.id, "get", );
  xhr.send();
  
  xhr.addEventListener("readystatechange", function () {  
    if (this.readyState === 4) {
      if(this.status === 200) {
        const url = window.URL.createObjectURL(new Blob([this.responseText]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        dispatch({type: "DOWNLOAD_SUCCESS"})
      } else {
        dispatch({type: "DOWNLOAD_FAILED"})
      }
    }
  });
}
  
  export const uploadItem = (files, folder) => dispatch => {
    dispatch({type : filesConstants.FETCH_FILES_PENDING});
    
    let user = JSON.parse(localStorage.getItem("user"));
    let folderId = folder || user.username;
    
    
    let url = "http://localhost:8082/folder/"+folderId + "/upload";
    
    let xhr = xhrCreator(url, "post");
    let formD = new FormData();
    [...files].forEach(file => formD.append("files", file));
    
    xhr.send(formD);
    xhr.addEventListener("readystatechange", function () {  
      if (this.readyState === 4) {
        let resp = JSON.parse(this.responseText)
        console.log(resp);
        if(this.status === 200) {
          dispatch({ type : "UPLOAD_SUCCESS"})
        } else {
          dispatch({ type : "UPlOAD_ERROR"})
        }
      }
    });
  }
  
  export const createFolder = (folderName, parentId) => dispatch => {
    
    console.log(folderName, parentId);
    let user = JSON.parse(localStorage.getItem("user"));
    
    let folderId = parentId || user.username;
    var data = null;
    let xhr = xhrCreator("http://localhost:8082/folder/" + folderId + "/new/" + folderName, "post");
    xhr.send(data);
    
    xhr.addEventListener("readystatechange", function () {  
      if (this.readyState === 4) {
        let resp = JSON.parse(this.responseText);
        if(this.status === 200) {
          dispatch({type: "CREATE_FOLDER_SUCCESS"})
        } else {
          dispatch({type: "CREATE_FOLDER_ERROR"})
        }
        console.log(resp)
      }
    });
  } 
  
  // /file/search/{namePart} global search by name +++done+++
  export const searchByName = (searchKey) => dispatch => {
  
    dispatch({ type : filesConstants.FETCH_FILES_PENDING });
    var data = null;
    let xhr = xhrCreator("http://localhost:8082/file/search/" + searchKey, "get");
    xhr.send(data);
    
    xhr.addEventListener("readystatechange", function () {  
      if (this.readyState === 4) {
        let resp = JSON.parse(this.responseText);
        if(this.status === 200) {
          let driveFormat = {navigation: [{name: "search", id: 0}, {name: searchKey, id: 1}], content: resp}
          dispatch({type: filesConstants.FETCH_FILES_SUCCESS, res: driveFormat})
        } else {
          dispatch({type: filesConstants.FETCH_FILES_FAILURE})
        }
        console.log(resp)
      }
    });
  }
 

  // /file/navigation/{fileId} configure navigation for file why?
  

export const shareWith = (fileId, userList) =>  dispatch => {
// usernames and fileIds
// unshare
// share/users list of users shared this file
// /user/search/{nameChunk}

///// !!!!!!!!!!!!!!! LAST STAGE
}


export const moveFile = (fileIds, destId, srcId) => dispatch=> {
  // srcId destId fileIds
  // /files/move  depends on FolderTree

}

// file details
export const getDetails = (fileId) => dispatch => {
  // /file/details/{fileId} get we don't need to call it here
  
}


// buildFileSystemTree ????? used for file move
export const buildFileSystemTree = () => dispatch => {
  // /folder/tree get we dont need to call this in redux
}

// serveInFolder ??? показать в папке
export const serveInFolder = () => dispatch => {
  // /folder/serveIn/{fileId} get not tested Yet
}

// download file(S)  needs to be added for service what??? we need to remember and discover this







// 1)Download 2) Move file 3) Search and Nav 4)Share

// User Management Page