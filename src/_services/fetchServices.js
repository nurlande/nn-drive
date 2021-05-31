// const localURL = "http://localhost:8080/";
// const testURL = "http://localhost:8080/";
// const prodURL = "http://localhost:8080/";

let result = [
    {id: 1, fileName: "test", type: "folder"},
    {id: 2, fileName: "test1", type: "file"},
    {id: 3, fileName: "test2", type: "folder"},
    {id: 4, fileName: "test3", type: "file"}
];
let searchResult = [
    {id: 1, fileName: "folder1", type: "folder"},
    {id: 2, fileName: "file1", type: "file"},
    {id: 3, fileName: "folder17", type: "folder"},
    {id: 4, fileName: "file666", type: "file"}
];

// fetch to /folder/{folderId}/content
export const fetchAllFiles = (folderId) => {
    
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            folderId ? resolve(searchResult) : resolve(result);
        }, 300);
        });      
        return myPromise;
}

// fetch to /folder/search/
export const fetchSearch = (searchKey) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            searchKey ? resolve(searchResult) : resolve(result);
        }, 300);
        });      
        return myPromise;
}

// fetch to /files/delete
export const fetchDeleteFile = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("deleted " + id);
        }, 300);
        });      
        return myPromise;
}

//fetch to /files/download or /file/download/{fileId}
export const fetchDownloadFile = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("downloading " + id);
        }, 300);
        });      
        return myPromise;
}

//fetch to /file/{fileId}/rename/{newName}
export const fetchRenameFile = (id, newName) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("renamed " + id + ", new name is " + newName);
        }, 300);
        });
        return myPromise;
}

//fetch to /folder/{folderId}/upload
export const fetchUploadFile = (file) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let url = "http://localhost:8082/folder/"+ user.username + "/upload/";
console.log(file)
    fetch(url, {
        method: 'post',
        headers: new Headers({"Authorization": "Bearer " + user.token, 'Content-Type': 'multipart/form-data'}),
        body: JSON.stringify({
            "files": [...file]
        })
    }).then(res=> console.log(res)).catch(err=>console.log(err))

    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("uploaded");
        }, 300);
        });
        return myPromise;
}

export const moveFile = (fileId, newParentId) => {

}

export const createFolder = (fileName, parentId) => {

} 

export const shareWith = (fileId, userList) => {

}

// needed to be added moveFile operation, createFolder operation, share operation

// also sending file fetchs with user principals


export const xhrCreator = (url, method, headers, body) => {
    let user = JSON.parse(localStorage.getItem("user"));
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open(method, url);
    // xhr.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudXJsYW4iLCJleHAiOjE2MjE5NjYyMDEsImlhdCI6MTYyMTk0NDYwMX0.7TI9LM_ZE6UO-vg5Nt32Xn8YXAKn83a7zNmjgitl4wg");
    xhr.setRequestHeader("authorization", "Bearer " + user.token);
    xhr.setRequestHeader("cache-control", "no-cache");
    if(headers && headers.length > 0) {
        headers.map(h => xhr.setRequestHeader(h.field, h.value))
    }
    return xhr;
}