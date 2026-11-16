
const db = require('../config/db');

async function totalpopulation(req, res) {
    try {
        const q1 = "SELECT SUM(Population) AS totalpopulation FROM country";
        const [result] = await db.query(q1);

        res.status(200).send({
            totalpopulation: result[0].totalpopulation
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function top10popuCountry(req, res) {
    try {
        const q2 = "SELECT Name, Population FROM country ORDER BY Population DESC LIMIT 10";
        const [result] = await db.query(q2);

        res.status(200).send({
            top10popuCountry: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function top10populatestCountry(req, res) {
    try {
        const q3 = "SELECT Name, Population FROM country ORDER BY Population ASC LIMIT 10";
        const [result] = await db.query(q3);

        res.status(200).send({
            top10leastpopulatedCountry: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function totalCountries(req, res) {
    try {
        const q4 = "SELECT COUNT(*) AS TotalCountries FROM country";
        const [result] = await db.query(q4);

        res.status(200).send({
            totalCountries: result[0].TotalCountries
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


// Q5: Average population
async function averagePopulation(req, res) {
    try {
        const q5 = "SELECT AVG(Population) AS AveragePopulation FROM country";
        const [result] = await db.query(q5);

        res.status(200).send({
            averagePopulation: result[0].AveragePopulation
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function populationByContinent(req, res) {
    try {
        const q6 = `SELECT Continent, SUM(Population) AS TotalPopulation
                    FROM country
                    GROUP BY Continent`;

        const [result] = await db.query(q6);

        res.status(200).send({
            populationByContinent: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function countriesByPopulation(req, res) {
    try {
        const value = Number(req.query.value);

        if (req.query.value === undefined || !Number.isFinite(value) || value < 0) {
            return res.status(400).send({
                msg: "Please provide a valid population value"
            });
        }

        const q7 = `SELECT Name, Population
                    FROM country
                    WHERE Population > ?
                    ORDER BY Population DESC`;

        const [result] = await db.query(q7, [value]);

        res.status(200).send({
            countries: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function CountriesByPopulation(req, res) {
    try {
        const population = Number(req.query.population);

        if (req.query.population === undefined || !Number.isFinite(population) || population < 0) {
            return res.status(400).send({
                msg: "Please provide a valid population value"
            });
        }

        const q8 = `SELECT Name, Population
                    FROM country
                    WHERE Population < ?
                    ORDER BY Population ASC`;

        const [result] = await db.query(q8, [population]);

        res.status(200).send({
            countries: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function CountryPopulation(req, res) {
    try {
        const { countryName } = req.query;

        if (!countryName) {
            return res.status(400).send({
                msg: "Please provide country name"
            });
        }

        const q9 = `SELECT Name, Population
                    FROM country
                    WHERE Name = ?`;

        const [result] = await db.query(q9, [countryName]);

        res.status(200).send({
            countryPopulation: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function OfficialLanguages(req, res) {
    try {
        const { countryName } = req.query;

        if (!countryName) {
            return res.status(400).send({
                msg: "Please provide country name"
            });
        }

        const q10 = `SELECT c.Name, cl.Language
                     FROM countrylanguage cl
                     JOIN country c ON cl.CountryCode = c.Code
                     WHERE c.Name = ?
                     AND cl.IsOfficial = 'T'`;

        const [result] = await db.query(q10, [countryName]);

        res.status(200).send({
            officialLanguages: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function getTotalLanguages(req, res) {
    try {
        const q11 = `SELECT COUNT(DISTINCT Language) AS TotalLanguages
                     FROM countrylanguage`;

        const [result] = await db.query(q11);

        res.status(200).send({
            totalLanguages: result[0].TotalLanguages
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function getTop10Languages(req, res) {
    try {
        const q12 = `SELECT Language, COUNT(*) AS CountryCount
                     FROM countrylanguage
                     GROUP BY Language
                     ORDER BY CountryCount DESC
                     LIMIT 10`;

        const [result] = await db.query(q12);

        res.status(200).send({
            top10Languages: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function getGDPPerCapita(req, res) {
    try {
        const q13 = `SELECT Name, GNP, Population,
                     ROUND(GNP * 1000000 / Population, 2) AS GDPPerCapita
                     FROM country
                     WHERE Population > 0
                     AND GNP IS NOT NULL
                     ORDER BY GDPPerCapita DESC`;

        const [result] = await db.query(q13);

        res.status(200).send({
            GDPPerCapita: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}



const db = require('../config/db');

async function averageLifeExpectancy(req, res) {
    try {
        const q14 = `SELECT AVG(LifeExpectancy) AS AverageLifeExpectancy
                     FROM country`;

        const [result] = await db.query(q14);

        res.status(200).send({
            averageLifeExpectancy: result[0].AverageLifeExpectancy
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function highestLifeExpectancy(req, res) {
    try {
        const q15 = `SELECT Name, LifeExpectancy
                     FROM country
                     WHERE LifeExpectancy IS NOT NULL
                     ORDER BY LifeExpectancy DESC
                     LIMIT 10`;

        const [result] = await db.query(q15);

        res.status(200).send({
            highestLifeExpectancy: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function lowestLifeExpectancy(req, res) {
    try {
        const q16 = `SELECT Name, LifeExpectancy
                     FROM country
                     WHERE LifeExpectancy IS NOT NULL
                     ORDER BY LifeExpectancy ASC
                     LIMIT 10`;

        const [result] = await db.query(q16);

        res.status(200).send({
            lowestLifeExpectancy: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function getCityInformation(req, res) {
    try {
        const { cityName } = req.query;

        if (!cityName) {
            return res.status(400).send({
                msg: "Please provide city name"
            });
        }

        const q17 = `SELECT *
                     FROM city
                     WHERE Name = ?`;

        const [result] = await db.query(q17, [cityName]);

        res.status(200).send({
            cityInformation: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function top10LargestCities(req, res) {
    try {
        const q18 = `SELECT Name, Population
                     FROM city
                     ORDER BY Population DESC
                     LIMIT 10`;

        const [result] = await db.query(q18);

        res.status(200).send({
            top10LargestCities: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


async function totalCities(req, res) {
    try {
        const q19 = `SELECT COUNT(*) AS TotalCities
                     FROM city`;

        const [result] = await db.query(q19);

        res.status(200).send({
            totalCities: result[0].TotalCities
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" });
    }
}


module.exports = {
    totalpopulation,
    top10popuCountry,
    top10populatestCountry,
    totalCountries,
    averagePopulation,
    populationByContinent,
    countriesByPopulation,
    CountriesByPopulation,
    CountryPopulation,
    OfficialLanguages,
    getTotalLanguages,
    getTop10Languages,
    getGDPPerCapita,
        averageLifeExpectancy,
    highestLifeExpectancy,
    lowestLifeExpectancy,
    getCityInformation,
    top10LargestCities,
    totalCities

};
