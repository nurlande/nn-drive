import { filesConstants } from "./../_constants"
import { fetchSearch } from './../_services/fetchServices';

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
  
  // DOWNLOAD IS NOT WORKING FOR NOW
  
  // fetchDownloadFile()
  // .then((resp) => {
    //   const url = window.URL.createObjectURL(new Blob([resp]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute('download', "download.txt");
    //   document.body.appendChild(link);
    //   link.click();
    //   dispatch({type: filesConstants.DOWNLOAD, id: id});
    // });
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
  
  export const searchByName = (searchKey) => dispatch => {
  
    dispatch({ type : filesConstants.FETCH_FILES_PENDING });
  
    fetchSearch(searchKey)
    .then(res => dispatch({ type : filesConstants.FETCH_FILES_SUCCESS, res: res}))
    .catch(err=>dispatch({type: filesConstants.FETCH_FILES_FAILURE}));
  }
 
  // /file/search/{namePart} global search by name

  // /file/navigation/{fileId} configure navigation for file
  
  
  
  
  
  // last stage

export const shareWith = (fileId, userList) =>  dispatch => {
// usernames and fileIds
// unshare
// share/users list of users shared this file
// /user/search/{nameChunk}
}


export const moveFile = (fileId, newParentId, parentSrcId) => dispatch=> {
  // srcId destId parentIDs
}


// file details

// buildFileSystemTree ????? used for file move

// serveInFolder ??? показать в папке

// download file(S)  needs to be added for service


// 1)Download 2) Move file 3) Search and Nav 4)Share

// User Management Page