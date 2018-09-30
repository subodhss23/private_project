export default function subscribe(state = {
	show: false
}, action) {
	 switch (action.type) {
    case 'SHOW_SUBSCRIBE':
      return {
      	show: true
      }
    case 'HIDE_SUBSCRIBE':
      return {
      	show: false
      }  
    default:
      return state
  }
}