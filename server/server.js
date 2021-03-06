const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const booksRouter = require('./routes/books.router');
const kidsRouter = require('./routes/kids.router');
const completedRouter = require('./routes/completed.router');
const pointsRouter = require('./routes/points.router')
const editRouter = require('./routes/edit.router')
const parentRouter = require('./routes/parent.router')
const rateRouter = require('./routes/rate.router')



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/books', booksRouter);
app.use('/kids', kidsRouter);
app.use('/completed', completedRouter);
app.use('/points', pointsRouter);
app.use('/edit', editRouter)
app.use('/parent', parentRouter)
app.use('/rate', rateRouter)





// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
