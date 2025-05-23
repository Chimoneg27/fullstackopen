const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "search":
      return action.payload
    default: 
      return state
  }
};

export const filterChange = filter => {
    return {
        type: 'search',
        payload: filter
    }
}

export default filterReducer