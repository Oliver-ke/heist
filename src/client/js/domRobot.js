import { handleDeleteSavedTrip } from './app';

// this is a big player in the project, it handle update on the ui,
// and dynamically create content using the provided arguments
/**
 * 
 * @param {string} action what do type of action to perform 
 * @param {domNode} element  what element would be update
 * @param {object | string} data  optional data to update the provided element with
 */
const domRobot = (action, element = null, data = null) => {
	switch (action) {
		case 'BUILD_WEATHER_FIELDS': {
			data.forEach((item) => {
				const {
					datetime,
					weather,
					temp,
					snow,
					wind_spd,
					wind_cdir
				} = item;
				const { icon, description } = weather;
				const fieldEle = document.createElement('div');
				fieldEle.setAttribute('class', 'field');
				fieldEle.innerHTML = `
					<div class="description">
						<img style="width: 50px; height: 50px;" src="./icons/${icon}.png" alt="weather-icon">
						<span>${description}</span>
					</div>
					<div class="content">
						<p>
							Temperature: <span>${temp}°C</span> <span class="bar">|</span>
							Snow: <span>${snow}</span> <span class="bar">|</span>
							Wind Speed: <span>${wind_spd}</span> <span class="bar">|</span>
							Wind Direction: <span>${wind_cdir}</span> <span class="bar">|</span>
							Date: <span>${datetime}</span>
						</p>
					</div>
				`;
				element.appendChild(fieldEle);
			});
			return;
		}
		case 'START_SPINNER': {
			element.classList.add('show-spinner');
			return;
		}
		case 'STOP_SPINNER': {
			element.classList.remove('show-spinner');
			return;
		}
		case 'SHOW_ERROR': {
			element.classList.add('show-error');
			element.textContent = data;
			return;
		}
		case 'HIDE_LANDING': {
			element.classList.remove('active');
			return;
		}
		case 'SHOW_LANDING': {
			element.classList.add('active');
			return;
		}
		case 'SHOW_SAVED_TRIP': {
			element.classList.add('active');
			return;
		}
		case 'HIDE_SAVED_TRIP': {
			element.classList.remove('active');
			return;
		}
		case 'SHOW_TRIP': {
			element.classList.add('active');
			return;
		}
		case 'HIDE_TRIP': {
			element.classList.remove('active');
			return;
		}
		case 'BUILD_TRIP_IMG': {
			const picturesContainer = document.createElement('div');
			data.forEach((url) => {
				const img = document.createElement('img');
				img.setAttribute('src', url);
				picturesContainer.appendChild(img);
			});
			element.appendChild(picturesContainer);
			return;
		}
		case 'BUILD_COUNTRY_INFO': {
			const {
				name,
				capital,
				region,
				subregion,
				currencies,
				flag,
				timezones
			} = data;
			element.innerHTML = `
			<div class="text-content">
				<p>
					<span>Country:</span> ${name} <br> 
					<span>Capital:</span> ${capital}  <br>
					<span>Region:</span> ${region} <br> 
					<span>Subregion:</span> ${subregion} <br>
					<span>Currency:</span> ${currencies[0].name} | ${currencies[0].symbol} <br>
					<span>Timezone:</span> ${timezones[0]}
				</p>
			</div>
			<img src=${flag}></img> 
			`;
			return;
		}
		case 'BUILD_SAVED_TRIP': {
			element.innerHTML = ``;
			data.forEach((trip) => {
				const {
					input,
					countryInfo: { name },
					weather: weatherInfo
				} = trip;
				const { datetime, weather, temp } = weatherInfo.pop();
				const { description } = weather;
				const tripElement = document.createElement('div');

				const deleteBtn = document.createElement('button');
				deleteBtn.setAttribute('class', 'btn delete-trip danger');
				deleteBtn.setAttribute('data', input.location);
				deleteBtn.addEventListener('click', handleDeleteSavedTrip);
				deleteBtn.innerHTML = `
					<i class="fas fa-times"></i>
				`;
				tripElement.setAttribute('class', 'trip-item');
				tripElement.innerHTML = `
					<p>
						<span>Location:</span> ${input.location}<br>
						<span>Arrival Date:</span> ${input.arrivalDate}<br>
						<span>Return Date:</span> ${input.returnDate}<br>
						<span>Date:</span> ${datetime} <br>
						<span>Country:</span> ${name}<br>
						<span>Weather:</span> ${description} <br>
						<span>Temperature:</span> ${temp}°C <br>
					</p>
				`;
				tripElement.appendChild(deleteBtn);
				element.appendChild(tripElement);
			});
			return;
		}
		case 'SWITCH_SECTION_TO': {
			return window.location.reload(false);
		}
		case 'CLEAR_ERROR': {
			return element.classList.remove('show-error');
		}
		default:
			return;
	}
};

export default domRobot;
