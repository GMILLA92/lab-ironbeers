const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const  fBeers = async function(){
    try {
      const beerArray = await punkAPI.getBeers();
      beerArray.splice(25)
      const data = {
        beerKey: beerArray
      }
      res.render('beers',data)
    } catch (e) {
      console.error(e); 
    }
  }
  fBeers()
 
});

app.get('/random-beer', (req, res) => {
  const  randomBeer = async function(){
    try {
      const random = await punkAPI.getRandom();
      const data2 = {
        beerKey: random[0]
      }
      res.render('random-beer',data2)
    } catch (e) {
      console.error(e); 
    }
  }
  randomBeer()

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
