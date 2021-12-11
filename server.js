const express = require('express');
const cors = require('cors');
const path = require('path');

const webapp = express();

webapp.use(cors());

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(express.static(path.join(__dirname, './client/build')));

const routes = require('./routes');






webapp.use((_req, res) => {
  res.status(404);
});


// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

module.exports = webapp;