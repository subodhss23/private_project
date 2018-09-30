export default function feedback(state = {
	complete: false
}, action) {
	switch(action.type) {
		case 'FEEDBACK_FAIL': 
		case 'FEEDBACK_SUCCESS': 
			return {
				complete: true
			}
		default: return state
	}
}
