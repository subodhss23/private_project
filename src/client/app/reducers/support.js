export default function support(state = {
	complete: false
}, action) {
	switch(action.type) {
		case 'SUPPORT_FAIL': 
		case 'SUPPORT_SUCCESS': 
			return {
				complete: true
			}
		default: return state
	}
}
