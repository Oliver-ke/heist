
// project main file
import {
	locationEle,
	arrDateEle,
	retDateEle,
	spinnerEle,
	errorEle,
	indexSection,
	tripDetailSection,
	locationImg,
	countryInfoEle,
	weatherInfoEle,
	savedTripItemEle,
	usersSavedTripSection
} from './selectors';

import makeUri from './makeUri';
import { baseUrls, keys } from './keysAndUrl';
import { verifyDate, makeStringArray, fetchData } from './projectUtils';
import domRobot from './domRobot';

// holds app data
const usersPayload = {
	coordinate: {},
	weather: [],
	countryInfo: {},
	pictures: [],
	input: {}
};

// fires on get trip request
const getTripHandler = async (e) => {
	e.preventDefault();
	const location = locationEle.value;
	const arrivalDate = arrDateEle.value;
	const returnDate = retDateEle.value;

	if (!location || !arrivalDate || !returnDate) {
		return domRobot('SHOW_ERROR', errorEle, 'Provide a location and dates');
	}
	const { error: dateError, days } = verifyDate(arrivalDate);
	if (dateError) {
		return domRobot('SHOW_ERROR', errorEle, dateError);
	}


	usersPayload.input = { location, arrivalDate, returnDate, days };

	domRobot('CLEAR_ERROR', errorEle);
	domRobot('START_SPINNER', spinnerEle);

	// get location search coodinate using the geo api
	const geoUrl = makeUri('GEONAMES', location, baseUrls, keys);
	const { error, data } = await fetchData(geoUrl, fetch);
	if (error || !data.geonames[0]) {
		domRobot('STOP_SPINNER', spinnerEle);
		return domRobot('SHOW_ERROR', errorEle, 'Could not find Location');
	}
	const { lng: lon, lat, countryName } = data.geonames[0];
	usersPayload.coordinate = { lon, lat };
	
	const weaUrl = makeUri('WEATHERBIT', { lon, lat, days }, baseUrls, keys);
	const { data: weatherData } = await fetchData(weaUrl, fetch);
	if (!weatherData.data[0]) {
		domRobot('STOP_SPINNER', spinnerEle);
		return domRobot('SHOW_ERROR', errorEle, 'No weather information for your location');
	}

	usersPayload.weather = weatherData.data;

	// get countres info
	const restCountryUrl = makeUri('RESTCOUNTRY', countryName, baseUrls);
	const { data: countryInfo, error: countryError } = await fetchData(
		restCountryUrl,
		fetch
	);
	if (countryError) {
		domRobot('STOP_SPINNER', spinnerEle);
		return domRobot(
			'SHOW_ERROR',
			errorEle,
			'Could not get location country'
		);
	}
	usersPayload.countryInfo = countryInfo[0];
	
	// get trip pictures
	const pictureUrl = makeUri('PIXABAY', countryName, baseUrls, keys);
	const { data: pictureData } = await fetchData(pictureUrl, fetch);
	usersPayload.pictures = makeStringArray(
		pictureData.hits,
		'webformatURL'
	);
	// update DOM
	domRobot('BUILD_TRIP_IMG', locationImg, usersPayload.pictures);
	domRobot('BUILD_COUNTRY_INFO', countryInfoEle, usersPayload.countryInfo);
	domRobot('BUILD_WEATHER_FIELDS', weatherInfoEle, usersPayload.weather);
	domRobot('STOP_SPINNER', spinnerEle);
	domRobot('HIDE_LANDING', indexSection);
	domRobot('SHOW_TRIP', tripDetailSection);
	console.log(usersPayload);
	return;
};

// fires on save trip click
const saveTripHandler = (e) => {
	const exitingItems = JSON.parse(localStorage.getItem('trips'));
	if (exitingItems === null || exitingItems.length < 1) {
		const newItem = JSON.stringify([ usersPayload ]);
		localStorage.setItem('trips', newItem);
		return alert('Trip saved Successfully');
	}
	// check for duplicate
	const lastItem = exitingItems[exitingItems.length - 1];
	if (lastItem.input.location == usersPayload.input.location) {
		return alert('Trip already saved');
	}
	// update localstorage
	const payload = JSON.stringify([ ...exitingItems, usersPayload ]);
	localStorage.setItem('trips', payload);
	return alert('Trip saved Successfully');
};

const checkNewTripHandler = () => {
	return domRobot('SWITCH_SECTION_TO');
};

// fires on view saved trip clicked
const viewSavedTripHandler = () => {
	const data = JSON.parse(localStorage.getItem('trips'));
	if (data === null) {
		return alert('You have no saved trips yet, save a trip');
	}
	domRobot('BUILD_SAVED_TRIP', savedTripItemEle, data);
	domRobot('HIDE_TRIP', tripDetailSection);
	domRobot('HIDE_LANDING', indexSection);
	domRobot('SHOW_SAVED_TRIP', usersSavedTripSection);
};

// handles delete saved trip
const handleDeleteSavedTrip = (e) => {
	const item = e.target.getAttribute('data');
	const data = JSON.parse(localStorage.getItem('trips'));
	const update = data.filter((trip) => trip.input.location !== item);
	localStorage.setItem('trips', JSON.stringify(update));
	domRobot('BUILD_SAVED_TRIP', savedTripItemEle, update);
};

export {
	getTripHandler,
	saveTripHandler,
	checkNewTripHandler,
	viewSavedTripHandler,
	handleDeleteSavedTrip
};
