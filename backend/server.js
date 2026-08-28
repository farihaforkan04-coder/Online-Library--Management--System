const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Library Management API is running..." });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

console.log("PORT value is:", PORT);         ]
console.log("Type of PORT:", typeof PORT);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(` Server is really listening on http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
  console.error(" Server failed to start:", err.message);
});