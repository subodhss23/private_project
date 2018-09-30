import {getSearchSuggestions} from '../components/API.js'
import {eventWithValue, eventWithLabel} from '../components/GAHelper.jsx'

export function contactSupport(email, company, desc) {
    var fields = {"email" : email, "company": company, "desc": desc};
    var wrapper = {"fields": fields};
    return function(dispatch) {
        fetch('https://api.airtable.com/v0/applcD6rmQCWF1iq4/support', {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer keybSbM8CVDWe6Uzj',  
                "Content-type": 'application/json'
            },
            body: JSON.stringify(wrapper)
        })
        .then(res => res.json())
        .catch((error) =>  {
            console.error('Error:', error);
            eventWithValue("SUPPORT", "SEND", 0);
            dispatch(supportFail());
        })
        .then(response => {
            eventWithValue("SUPPORT", "SEND", 1);
            dispatch(supportSuccess())
        })
    }
}

export function requestBulkDelete(email, desc) {
    var fields = {"email" : email, "desc": desc};
    var wrapper = {"fields": fields};
    return function(dispatch) {
        fetch('https://api.airtable.com/v0/applcD6rmQCWF1iq4/support', {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer keybSbM8CVDWe6Uzj',  
                "Content-type": 'application/json'
            },
            body: JSON.stringify(wrapper)
        })
        .then(res => res.json())
        .catch((error) =>  {
            console.error('Error:', error);
            eventWithValue("BULKDELETE", "SEND", 0);
            dispatch(bulkDeleteFail());
        })
        .then(response => {
            eventWithValue("BULKDELETE", "SEND", 1);
            dispatch(bulkDeleteSuccess())
        })
    }
}

export function registerSubscribe(email) {
    var fields = {"email" : email};
    var wrapper = {"fields": fields};
    return function(dispatch) {
        fetch('https://api.airtable.com/v0/applcD6rmQCWF1iq4/subscribe', {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer keybSbM8CVDWe6Uzj',  
                "Content-type": 'application/json'
            },
            body: JSON.stringify(wrapper)
        })
        .then(res => res.json())
        .catch((error) =>  {
            console.error('Error:', error);
            eventWithValue("SUBSCRIBE", "SEND", 0);
            dispatch(subscribeFail());
        })
        .then(response => {
            eventWithValue("SUBSCRIBE", "SEND", 1);
            dispatch(subscribeSuccess())
        })
    }
}

export function sendFeedback(text, page) {
    var fields = {"Feedback" : text, "Page": page};
    var wrapper = {"fields": fields};
    return function(dispatch) {
        fetch('https://api.airtable.com/v0/applcD6rmQCWF1iq4/feedback', {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer keybSbM8CVDWe6Uzj',  
                "Content-type": 'application/json'
            },
            body: JSON.stringify(wrapper)
        })
        .then(res => res.json())
        .catch((error) =>  {
            console.error('Error:', error);
            eventWithValue("FEEDBACK", "SEND", 0);
            dispatch(feedbackFail());
        })
        .then(response => {
            eventWithValue("FEEDBACK", "SEND", 1);
            dispatch(feedbackSuccess())
        })
    }
}

export function getSuggestions(input) {
    return function(dispatch) {
        const data = getSearchSuggestions(input);
        if (data.length == 0 && input.length != 0) {
            eventWithLabel("SEARCH", 'NO_RESULTS', input);    
        }
        dispatch(showSearchSuggestions(data))
    }
}

export function showSubscribeModal() {
    return function(dispatch) {
        dispatch(showSubscribe())
    }
}

export function hideSubscribeModal() {
    return function(dispatch) {
        dispatch(hideSubscribe())
    }
}

const showSearchSuggestions = (data) => (
    {
        type: 'SHOW_SEARCH_SUGGESTIONS',
        data: data
    }
)

const bulkDeleteSuccess = () => (
    {type: 'BULK_DELETE_SUCCESS'}
)

const bulkDeleteFail = () => (
    {type: 'BULK_DELETE_FAIL'}
)

const supportSuccess = () => (
    {type: 'SUPPORT_SUCCESS'}
)

const supportFail = () => (
    {type: 'SUPPORT_FAIL'}
)

const subscribeSuccess = () => (
    {type: 'SUBSCRIBE_SUCCESS'}
)

const subscribeFail = () => (
    {type: 'SUBSCRIBE_FAIL'}
)

const feedbackSuccess = () => (
	{type: 'FEEDBACK_SUCCESS'}
)

const feedbackFail = () => (
	{type: 'FEEDBACK_FAIL'}
)

const showSubscribe = () => (
    {type: 'SHOW_SUBSCRIBE'}
)

const hideSubscribe = () => (
    {type: 'HIDE_SUBSCRIBE'}
)