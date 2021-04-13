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
                fetchFilesState : filesConstants.FETCH_FILES_FAILURE,
                data: state.data
            }
        case filesConstants.DELETE : 
            return {
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                data: [...state.data].filter(item => item.id !== action.id)
            }
        case filesConstants.DOWNLOAD : 
            return {
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                data: state.data
            }
        case filesConstants.RENAME :
            state.data[state.data.findIndex(item => item.id === action.id)].fileName = action.newName; 
            return {
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                data: state.data
            }
        case filesConstants.UPLOAD : 
            return {
                fetchFilesState : filesConstants.FETCH_FILES_SUCCESS,
                data: [action.file]
            }
        default: { 
            return state;
        }
    }
}