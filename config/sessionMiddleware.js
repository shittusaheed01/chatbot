const session = require("express-session");
const MongoStore = require('connect-mongo');

const { config } = require("./config");


const sessionMiddleware = session({
	secret: config.sessionSecret,
	resave: false, 
	domain:config.hostDomain,
	saveUninitialized: true,
	store: MongoStore.create({
    mongoUrl: config.mongoURI,
    autoRemove: 'native' // Default
  }),
	cookie: { secure: false, maxAge: +config.sessionMaxAge },
});

module.exports = sessionMiddleware;
