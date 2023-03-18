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
	resave: false,
	saveUninitialized: true,
	store,
	cookie: {		
		maxAge: +config.sessionMaxAge,
		domain:"chatbot-zznn.onrender.com",
		httpOnly: true,
		secure: false,
    path: '/',
    sameSite: 'strict',
    proxy: true // set proxy in cookies
	},
});


module.exports = sessionMiddleware;
