
// function to produce an array of string from an array of objects
const makeStringArray = (objectArray, key) => {
	const formated = objectArray.map((object) => object[key]);
	return formated;
};

// a function to verify date input
const verifyDate = (date) => {
	const currentDate = new Date();
	const providedDate = new Date(date);
	if (providedDate < currentDate) {
		return { error: 'Your date is backward', days: null };
	}
	const timeDifference = providedDate.getTime() - currentDate.getTime();
	let dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));
	if (dayDifference > 16) {
		return { error: 'Forecast only available for 16 days from now', days: null };
	}
	if(dayDifference === 0){
		dayDifference = 1;
	}
	return { error: null, days: dayDifference };
};

// this is a testable function to fetch data from API
const fetchData = async (url, parser) => {
	try {
		const res = await parser(url);
		const data = await res.json();
		return { error: null, data };
	} catch (error) {
		console.log(`${error} ${url}`);
		return { error: error, data: null };
	}
};

export {  makeStringArray, verifyDate, fetchData };
