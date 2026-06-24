
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./jobs/draftScheduler");
const aiRoutes = require("./routes/aiRoutes");

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const newsRoutes = require("./routes/newsRoutes");

const externalNewsRoutes = require("./routes/externalNewsRoutes");

const savedNewsRoutes = require("./routes/savedNewsRoutes");

const newsFetchRoutes =
  require("./routes/newsFetchRoutes");

  const startNewsCron =
  require("./jobs/newsCron");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/external-news", externalNewsRoutes);
app.use( "/api/saved-news", savedNewsRoutes);
app.use(
  "/api",
  newsFetchRoutes
);
app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

  startNewsCron();

})
.catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});