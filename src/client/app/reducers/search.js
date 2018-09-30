export default function search(state = {
	suggestions: []
}, action) {
	 switch (action.type) {
    case 'SHOW_SEARCH_SUGGESTIONS':
      return {
      	suggestions: action.data
      }
    default:
      return state
  }
}