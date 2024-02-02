const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const socketModule = require("./utils/socketio");

// Connect Database
connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Backend API is Running Msg
app.get("/backend", (req, res) => {
  res.send("API is running..");
});

// Review Route
app.use("/api/review", require("./routes/reviews"));


const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  socketModule.init(server);
});

// DB error handler
process.on("unhandledRejection", (err, promise) => {
  console.log(`Log Error: ${err}`);
  socketModule.closeIO();
  server.close(() => process.exit(1));
});
