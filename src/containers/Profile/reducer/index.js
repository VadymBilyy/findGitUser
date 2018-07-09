const initialState = {
  gitUser: null,
  isProcessing: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'USER_FETCHED_SUCCESSFUL':
      return {
        ...state,
        isProcessing: false,
        gitUser: action.data.user
      }
    case 'USER_FETCHED_FAILURE':
      return {
        ...state,
        isProcessing: false,
        gitUser: null
      }
    case 'FETCHING_USER':
      return {
        ...state,
        isProcessing: true
      }
    default:
      return state
  }
}
