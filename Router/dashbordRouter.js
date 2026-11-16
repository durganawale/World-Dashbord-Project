
const express = require('express');
const router = express.Router();

const dashboard = require('../controllers/dashbordcontroller');

router.get('/totalpopulation', dashboard.totalpopulation);
router.get('/top10popuCountry', dashboard.top10popuCountry);
router.get('/top10populatestCountry', dashboard.top10populatestCountry);
router.get('/totalCountries', dashboard.totalCountries);
router.get('/averagePopulation', dashboard.averagePopulation);
router.get('/populationByContinent', dashboard.populationByContinent);
router.get('/countriesByPopulation', dashboard.countriesByPopulation);

router.get('/CountriesByPopulation', dashboard.CountriesByPopulation);
router.get('/CountryPopulation', dashboard.CountryPopulation);
router.get('/OfficialLanguages', dashboard.OfficialLanguages);
router.get('/getTotalLanguages', dashboard.getTotalLanguages);
router.get('/getTop10Languages', dashboard.getTop10Languages);
router.get('/getGDPPerCapita', dashboard.getGDPPerCapita);
router.get('/averageLifeExpectancy', dashboard.averageLifeExpectancy);

router.get('/highestLifeExpectancy', dashboard.highestLifeExpectancy);

router.get('/lowestLifeExpectancy', dashboard.lowestLifeExpectancy);

router.get('/getCityInformation', dashboard.getCityInformation);

router.get('/top10LargestCities', dashboard.top10LargestCities);

router.get('/totalCities', dashboard.totalCities);

module.exports = router;
