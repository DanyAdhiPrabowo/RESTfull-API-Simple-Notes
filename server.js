var express 	    = require('express');
const app		      = express();

require('dotenv/config');

const port 		    = process.env.PORT;
const bodyParser  = require('body-parser');
const routes 	    = require('./routes');
var cors 		      = require('cors');

// CORS
var whitelist = ['http://192.168.100.78', 'http://192.168.100.24', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) { //!origin for access on local
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.use(
	bodyParser.urlencoded({
		extended:true,
	})
);
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const { start, httpStatus, message, previousError, stack } = err
  console.log(stack);

  res.status(httpStatus || 406).json({
    status: false,
    code: httpStatus || 406,
    message,
    data: previousError,
  })
});

routes(app);

app.listen(port);
console.log('Server Runing.'+port);