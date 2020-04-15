var path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// add cors middleware
app.use(cors());

app.use(express.static('dist'));

// object to hold app data
let saveTripData = {};

// enable json payload
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// server static assets
app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

//endpoint to save trip
app.post('/api/trip', (req, res) => {
	const userPayload = { ...req.body };
	saveTripData = userPayload;
	return res.status(201).json({ message: 'Item added', saveTripData });
});

// endpoint to get trip details
app.get('/api/trip', (req, res) => {
	return res.status(200).json(saveTripData);
});

// set port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;