// const URL = "http://localhost:8080/";
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

export const fetchAllFiles = (folderName) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            folderName ? resolve(searchResult) : resolve(result);
        }, 300);
        });      
        return myPromise;
}
export const fetchSearch = (searchKey) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            searchKey ? resolve(searchResult) : resolve(result);
        }, 300);
        });      
        return myPromise;
}
export const fetchDeleteFile = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("deleted " + id);
        }, 300);
        });      
        return myPromise;
}
export const fetchDownloadFile = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("downloading " + id);
        }, 300);
        });      
        return myPromise;
}
export const fetchRenameFile = (id, newName) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("renamed " + id + ", new name is " + newName);
        }, 300);
        });
        return myPromise;
}
export const fetchUploadFile = (file) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("uploaded" + file.fileName);
        }, 300);
        });
        return myPromise;
}
