const CLIENT_ID = "663898628386-ssp8534249rgr1jblf2mao1bd5m6legq.apps.googleusercontent.com";
const DISCOVERY_DOC = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPE = "https://www.googleapis.com/auth/calendar";

const authorizeButton = document.querySelector("#authorizeButton");
const newEventForm = document.querySelector("#newEventForm");
const warningText = document.querySelector("#warning");

function handleClientLoad() {
	gapi.load("client:auth2", initClient);
}

function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOC,
		clientId: CLIENT_ID,
		scope: SCOPE
	}).then(() => {
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

		authorizeButton.onclick = (e) => {
			gapi.auth2.getAuthInstance().signIn();
		}
	});
}

function updateSigninStatus(signedIn) {
	if(signedIn) {
		authorizeButton.style.display = "none";
		newEventForm.style.display = "block";
		newEventForm.onsubmit = handleFormSubmit;
	} else {
		authorizeButton.style.display = "block";
	}
}

function handleFormSubmit(e) {
	e.preventDefault();
	const inputValues = [];
	const inputs = document.querySelectorAll("#newEventForm > input");
	for(let i = 0; i < 3; i++) { // only first 3 inputs are mandatory
		const el = inputs[i];
		if(el.value) {
			inputValues.push(el.value);
		} else {
			warningText.style.display = "block";
			return;
		}
	}
	warningText.style.display = "none";
	for(let i = 3; i < inputs.length - 1; i++) { // inputs.length - 1 used to prevent checking submit button
		const el = inputs[i];
		inputValues.push(el.value);
	}
	console.log(inputValues);
	const [classVal, eventVal, dateVal, startVal, endVal, locationVal] = inputValues;
	const summary = classVal + " " + eventVal;
	createEvent(summary, locationVal, dateVal, startVal, endVal);
}

function createEvent(summary, location, date, startTime, endTime) {
	const resource = {
		"summary": summary,
		"start": {
			"timeZone": "America/Chicago"
		},
		"end": {
			"timeZone": "America/Chicago"
		},
		"reminders": {
			"useDefault": false
		}
	}
	if(location) {
		resource.location = location;
	}
	if(startTime && endTime) {
		resource.start.dateTime = date + "T" + startTime + ":00";
		resource.end.dateTime = date + "T" + endTime + ":00";
	} else {
		resource.start.date = date;
		resource.end.date = date;
	}

	console.log(resource);
	gapi.client.calendar.events.insert({
		"calendarId": "primary",
		"resource": resource
	}).then((res) => {
		console.log("event created");
	});
}
