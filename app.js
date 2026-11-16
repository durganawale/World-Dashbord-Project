const express = require ('express');
const cors = require('cors');

require('dotenv').config();

const db = require('./config/db');
const dashbordRouter = require('./Router/dashbordRouter');

const app = express();

const port = process.env.PORT || 7010;

app.use(express.json());
app.use(cors());

// Dashboard Router

app.use('/dashboard', dashbordRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//1. http://localhost:7010/dashboard/totalpopulation
//2. http://localhost:7010/dashboard/top10popuCountry
//3. http://localhost:7010/dashboard/top10populatestCountry
//4.http://localhost:7010/dashboard/totalCountries
//5.http://localhost:7010/dashboard/averagePopulation
//6.http://.localhost:7010/dashboard/populationByContinent
//7.http://localhost:7010/dashboard/countriesByPopulation?value=100000000
//8,localhost:7010/dashboard/CountriesByPopulation?population=1000000
//9.localhost:7010/dashboard/CountryPopulation?countryName=India
	//10.http://localhost:7010/dashboard/OfficialLanguages?countryName=India
	//11.http://localhost:7010/dashboard/getTotalLanguages
	//12.http://localhost:7010/dashboard/getTop10Languages
//	13.http://localhost:7010/dashboard/getGDPPerCapita
//14.http://localhost:7010/dashboard/averageLifeExpectancy
//15.http://localhost:7010/dashboard/highestLifeExpectancy
//	16.http://localhost:7010/dashboard/lowestLifeExpectancy
//17.	http://localhost:7010/dashboard/getCityInformation?cityName=Mumbai
//18.	http://localhost:7010/dashboard/top10LargestCities
//	19.http://localhost:7010/dashboard/totalCities