import { filesConstants } from "./../_constants"

//Initial state
const initialState = { }

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
        case filesConstants.DELETE : 
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS
            }
        case filesConstants.DOWNLOAD : 
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS
            }
        case filesConstants.RENAME :
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS
            }
        case filesConstants.UPLOAD : 
            return {
                ...state,
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS
            }
        default: { 
            return state;
        }
    }
}