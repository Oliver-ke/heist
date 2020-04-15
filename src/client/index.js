import {
	getTripHandler,
	saveTripHandler,
	checkNewTripHandler,
	viewSavedTripHandler
} from './js/app';
import {
	getTripBtn,
	tripFormEle,
	saveTripBtn,
	newTripBtn,
	viewSavedTrips,
	newTripOnSaved
} from './js/selectors';

import './styles/main.scss';

//either button submit or form submit
getTripBtn.addEventListener('submit', getTripHandler);
tripFormEle.addEventListener('submit', getTripHandler);


saveTripBtn.addEventListener('click', saveTripHandler);
newTripBtn.addEventListener('click', checkNewTripHandler);
viewSavedTrips.addEventListener('click', viewSavedTripHandler);
newTripOnSaved.addEventListener('click', checkNewTripHandler);
