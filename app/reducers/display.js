import { display } from '../store/initialState'

export default function (state = display, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return Object.assign({}, state, {sidebarOpen: true})
    case "CLOSE_SIDEBAR":
      return Object.assign({}, state, {sidebarOpen: false})
    default:
      return state
  }
}
