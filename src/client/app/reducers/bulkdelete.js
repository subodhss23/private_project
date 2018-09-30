export default function bulkdelete(state = {
	complete: false
}, action) {
	switch(action.type) {
		case 'BULK_DELETE_FAIL': 
		case 'BULK_DELETE_SUCCESS': 
			return {
				complete: true
			}
		default: return state
	}
}
