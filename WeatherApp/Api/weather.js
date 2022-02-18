const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    temp: null
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Not Available') {
          res.render('index', {
            city: data.message,
            des: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const temp = data.main.temp;

          res.render('index', {
            city, des, temp
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      temp: null
    })
  }

})


module.exports = router;