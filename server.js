`use strict`;

const express = require(`express`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);

const PORT = process.env.PORT || 3000;

const db = require(`./models`);

const apiRoutes = require(`./routes/api-routes`);
const htmlRoutes = require(`./routes/html-routes`);

const app = express();

app.use(express.static(`public`));
app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/workoutdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
