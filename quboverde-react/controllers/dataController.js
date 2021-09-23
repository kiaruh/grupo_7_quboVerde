const fetch = require('node-fetch');

let datos = async (req, res) => {
  fetch('http://localhost:3001/api/users')
    .then(response => response.json())
    .then(dato => {
      return res.json(dato)
    })
}
