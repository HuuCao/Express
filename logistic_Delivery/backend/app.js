require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
const { decrypt, encrypt } = require("./libs/crypt");
const indexRouter = require("./routers/index");
const app = express();

// const Sentry = require("@sentry/node");
// // or use es6 import statements
// // import * as Sentry from '@sentry/node';

// const Tracing = require("@sentry/tracing");
// // or use es6 import statements
// // import * as Tracing from '@sentry/tracing';

// Sentry.init({
//   dsn: "https://3b8bb14c0f2942cc95e5845608d12110@o880922.ingest.sentry.io/5945731",

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });

// setTimeout(() => {
//   try {
//     foo();
//   } catch (e) {
//     Sentry.captureException(e);
//   } finally {
//     transaction.finish();
//   }
// }, 99);

module.exports = app
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use("/api", indexRouter)
	.use((req, res, next) => {
		next(new Error("404:Not Found Endpoint"));
	})
	.use((error, req, res, next) => {
		const messages = error.message.split(":").map((v) => (Number(v) ? Number(v) : v));
		console.log(messages);
		const httpError = createError(...messages);
		if (httpError.status !== 404) {
			console.log(httpError);
		}
		res.status(httpError.statusCode || 500).json(httpError);
	});
