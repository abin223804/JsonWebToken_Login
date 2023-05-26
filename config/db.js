const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database conncted");
    })
    .catch((error) => {
      console.log("database connection failed..fix the error");
      console.error(error);
      process.exit(1);
    });
};
