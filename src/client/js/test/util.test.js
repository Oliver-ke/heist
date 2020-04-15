import { verifyDate, makeStringArray, fetchData  } from '../projectUtils';

describe(' verifyDate util tests', () => {
	it('Should return error for backward dates', () => {
		const date = new Date('04/03/2019');
		const { error, days } = verifyDate(date);
		expect(error).toBe('Your date is backward');
		expect(days).toBe(null);
	});
	it('Should return error for date difference > 16', () => {
		const date = new Date('12/12/2020');
		const { error, days } = verifyDate(date);
		expect(error).toBe('Forecast only available for 16 days from now');
		expect(days).toBe(null);
	});
	it('Should return days for valid dates', () => {
		const date = new Date('04/20/2020');
		const { error } = verifyDate(date);
		expect(error).toBe(null);
	});
});

describe('formatToStringArray util test', () => {
	const mockedObjectArray = [
		{
			name: 'Oliver',
			likes: 'Drinks',
			hates: 'Alcohol'
		}
	];
	const value = makeStringArray(mockedObjectArray, 'likes');
	expect(value).toContain('Drinks');
});


describe('FetchData function test', () => {
	it('Should call perser with the url', async () => {
		const mockPerser = (url) => {
			return {
				json: () => `Hey, this is the url ${url}`
			};
		};
		const { data } = await fetchData('https://someurl.com', mockPerser);
		expect(data).toBe('Hey, this is the url https://someurl.com');
	});
});
