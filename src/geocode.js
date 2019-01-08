const { memoize } = require('cerebro-tools')

const geocode = (term, userLang) => {
  const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(term)}&language=${userLang}&key=AIzaSyA5JUepC4wTjVUOdk0vNgODVZcugiPu_-g`
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results)
}

module.exports = memoize(geocode)
