
// pageScopes
const indexSection = document.querySelector('section.index');
const tripDetailSection = document.querySelector('section.trip-detail');
const usersSavedTripSection = document.querySelector('section.users-saved-trips');

// trip details 
const locationImg = document.querySelector('.location-img');
const countryInfoEle = document.querySelector('.country-info');
const weatherInfoEle = document.querySelector('.weather-info');
const savedTripItemEle = document.querySelector('.trip-items');

// action buttons
const tripFormEle = document.querySelector('form');
const getTripBtn = document.querySelector('input[type=submit]');
const saveTripBtn = document.querySelector('button.save-trip');
const newTripBtn = document.querySelector('button.new-trip');
const viewSavedTrips = document.querySelector('.view-trip');
const newTripOnSaved = document.querySelector('.new-trip-onsaved');

// DOM dynamic elements
const locationEle = document.querySelector('#location');
const arrDateEle = document.querySelector('#arrDate');
const retDateEle = document.querySelector('#retDate');
const spinnerEle = document.querySelector('.spinner');
const errorEle = document.querySelector('span.error');

export {
	locationEle,
	arrDateEle,
	retDateEle,
	tripFormEle,
	getTripBtn,
	saveTripBtn,
	spinnerEle,
	errorEle,
	indexSection,
	tripDetailSection,
	locationImg,
	countryInfoEle,
	weatherInfoEle,
	newTripBtn,
	viewSavedTrips,
	usersSavedTripSection,
	savedTripItemEle,
	newTripOnSaved
};
