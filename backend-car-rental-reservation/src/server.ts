import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

// import AppError from './app/errors/AppError'
// import httpStatus from 'http-status'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('MongoDB connected successfully!')
    app.listen(config.port, () => {
      console.log(`The server is running at http://localhost:${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

// // for async uncaught error handling
// process.on('unhandledRejection', (reason,promise) => {
//   console.log(`Un handle rejection is detected at ${promise}, shutting down... reason:${reason}`)

//   if (server) {
//     server.close(() => {
//       process.exit(1)
//     })
//   }
// })

// // synchronous uncaught error handling

// process.on('uncaughtException', (error) => {
//   console.log(`UncoughtException is detected at ${error}, shouting down`)
//   throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,`UncaughtException: ${error}`)
//   process.exit(1)
// })

// // Async unhandled rejection handling
// process.on('unhandledRejection', (reason, promise) => {
//   const reasonMessage = reason instanceof Error ? reason.message : JSON.stringify(reason);
//   console.log(`Unhandled rejection detected at ${promise}. Reason: ${reasonMessage}`);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// });

// // Synchronous uncaught exception handling
// process.on('uncaughtException', (error) => {
//   console.log(`Uncaught exception detected: ${error}`);

//   // Assuming AppError is a custom error class and httpStatus is an object with status codes
//   const appError = new AppError(httpStatus.INTERNAL_SERVER_ERROR, `UncaughtException: ${error.message}`);

//   // Log the error details (if necessary, this could be an external logging service)
//   console.error(appError);

//   process.exit(1);
// });
