import * as Constants from "../constants/actions"

const inttialState = {
  data: []
}

const ListFilterButtonReducer = (state = inttialState, action) => {
  switch (action.type) {
    case Constants.GET_FILTER_BUTTON_SUCCSESS:
      return action.payload
    default:
      return state
  }
}

export { ListFilterButtonReducer }