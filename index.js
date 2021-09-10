const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const accessToken = "1";
const cors = require('cors');
// add to gitignore
const superHeroApiUrl = "https://www.superheroapi.com/api";

// app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'routes')));
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json(), cors());
// app.use(express.static(path.join(__dirname, '/dist')));


async function getHeroesByIds(ids) {
    try {
        const topFive = [];
        for await (const {id, superName, fullName, publisher, image} of ids.map(id => getById(id))) {
            topFive.push({id, superName, fullName, publisher, image});
        }
        return topFive.sort((a, b) => a.superName.localeCompare(b.superName));
    } catch (err) { return err.message }
}

async function getTopFive(){
    return await getHeroesByIds([70, 620, 720, 332, 644, 638]);
}

async function getById(id) {
    const res = await axios.get(`${superHeroApiUrl}/${accessToken}/${id}`);
    const hero = {id: res.data.id,
        superName: res.data.name,
        fullName: res.data.biography['full-name'],
        publisher: res.data.biography['publisher'],
        image: res.data.image.url};
    return hero;
}

async function getIdsByName(name) {
    const res = await axios.get(`${superHeroApiUrl}/${accessToken}/search/${name}`);
    return res.data.results.map(a => parseInt(a.id));
}

async function searchHero(name) {
    const ids = await getIdsByName(name);
    return getHeroesByIds(ids);
}

app.get('/api/popular', async (req, res) => {
    try {
        const popularHeroes = await getTopFive();
        res.json(popularHeroes);
    }
    catch (e) {
        res.status(500).send({ msg: 'Could not fetch popular heroes', e});
    }

})

app.get('/api/:id', async (req, res) => {
    try{
        const hero = await getById(req.params.id);
        res.json(hero);
    }
    catch (e) {
        res.status(400).send({ msg: 'Bad Request: Cannot find hero' });
    }
})

app.get('/api/:name', async (req, res) => {
    try{
        const hero = await searchHero(req.params.name);
        res.json(hero);
    }
    catch (e) {
        res.status(400).send({ msg: 'Bad Request: Cannot find hero' });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
