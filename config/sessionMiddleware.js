const session = require("express-session");
const MongoStore = require('connect-mongodb-session')(session);

const { config } = require("./config");

const store = new MongoStore({
	uri: config.local_db,
	collection: 'sessions',

});
store.on('error', function(error) {
	console.log(error);
});

const sessionMiddleware = session({
	secret: config.sessionSecret,
	resave: false, 
	saveUninitialized: true,
	store: store,
	cookie: { secure: false,domain:config.domain, maxAge: +config.sessionMaxAge },
});

module.exports = sessionMiddleware;
