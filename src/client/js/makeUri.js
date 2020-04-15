
// a testable util to make uri using the provided arguments
const makeUri = (name, payload, baseUrls, keys = null) => {
	const base = baseUrls[name];
	switch (name) {
		case 'GEONAMES': {
			const userName = keys.GEO_USER_NAME;
			const encoded = encodeURIComponent(payload);
			const uri = `maxRows=20&operator=OR&q=${encoded}&name=${encoded}&username=${userName}`;
			return `${base}?${uri}`;
		}
		case 'WEATHERBIT': {
			const apiKey = keys.WEATHERBIT_API_KEY;
			const { lat, lon, days } = payload;
			const uri = `key=${apiKey}&lat=${lat}&lon=${lon}&days=${days}`;
			return `${base}?${uri}`;
		}
		case 'PIXABAY': {
			const corsProxy = 'https://cors-anywhere.herokuapp.com/';
			const apikey = keys.PIXABAY_API_KEY;
			const city = encodeURIComponent(payload);
			const uri = `key=${apikey}&q=${city}&per_page=4`;
			return `${corsProxy}${base}?${uri}`;
		}
		case 'RESTCOUNTRY': {
			const countrySearch = encodeURIComponent(payload);
			const url = `${base}/${countrySearch}`;
			return url;
		}
		default: {
			return;
		}
	}
};

export default makeUri;
