require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// api routes
app.use('/users', require('./users/users.controller'));
app.use('/events', require('./events/event.controller'));

// global error handler
app.use(errorHandler);
app.listen(3005, () => {
 console.log("Server running on port 3005");
});