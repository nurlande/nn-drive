import { filesConstants } from "./../_constants"

//Initial state
const initialState = { 
    userList: []
}

export function FilesReducer (state = initialState, action) {
    switch (action.type) {
        case filesConstants.FETCH_FILES_PENDING :
            return {
                fetchFilesState : filesConstants.FETCH_FILES_PENDING,
                data: state.data
            }
        case filesConstants.FETCH_FILES_SUCCESS : 
            return {
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                data: action.res
            }
        case filesConstants.FETCH_FILES_FAILURE : 
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_FAILURE
            }
        case "CREATE_FOLDER_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                createFolder: "success"
            }
        case "CREATE_FOLDER_ERROR":
            return {
                ...state,
                createFolder: "error"
            }
        case "RENAME_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                renameFile: "success"
            }
        case "RENAME_ERROR":
            return {
                ...state,
                renameFile: "error"
            }
        case "UPLOAD_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                uploadFile: "success"
            }
        case "UPLOAD_ERROR":
            return {
                ...state,
                uploadFile: "error"
            }
        case "DELETE_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                deleteFile: "success"
            }
        case "DELETE_ERROR":
            return {
                ...state,
                deleteFile: "error"
            }
        case "DOWNLOAD_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                downloadFile: "success"
            }
        case "DOWNLOAD_ERROR":
            return {
                ...state,
                downloadFile: "error"
            }
        case "SHARE_SUCCESS":
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                share: "success"
            }
        case "SHARE_ERROR":
            return {
                ...state,
                share: "error"
            }
        default: { 
            return state;
        }
    }
}