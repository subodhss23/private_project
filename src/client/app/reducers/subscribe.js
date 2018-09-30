export default function subscribe(state = {
	complete: false
}, action) {
	switch(action.type) {
		case 'SUBSCRIBE_FAIL': 
		case 'SUBSCRIBE_SUCCESS': 
			return {
				complete: true
			}
		default: return state
	}
}
