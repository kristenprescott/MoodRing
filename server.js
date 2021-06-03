// https://javascript.plainenglish.io/accessing-the-spotifyalgorithm-full-stack-application-tutorial-part-1-792a2c0ff13
const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

const port = process.env.PORT || 8080;
// Security:
app.use(helmet());
app.use(hpp());

app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24hrs
  })
);
app.use(csurf());

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("╭──────────╮");
  console.log("│  *ʕ•ᴥ•ʔ* │");
  console.log("│----------│");
  console.log("│ ╭------╮ │");
  console.log("│ | PORT | │");
  console.log("│ |------| │");
  console.log(`│ | ${port} | │`);
  console.log("│ ╰------╯ │");
  console.log("╰──────────╯");
});

module.exports = app;
