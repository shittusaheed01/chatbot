const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const { config } = require("./config");

const store = new MongoStore({
	uri: config.local_db,
	databaseName: config.db_name,
	collection: "session",
});
store.on("error", function (error) {
	console.log(error);
});

const sessionMiddleware = session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: true,
	store: store,
	cookie: {
		secure: true,
		maxAge: +config.sessionMaxAge,
		domain: ".chatbot-zznn.onrender.com",
		httpOnly: true,
	},
});

module.exports = sessionMiddleware;
