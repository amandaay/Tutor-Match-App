import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import tutor from "./routers/tutors.js";
import test from "./routers/test.js";
import editProfile from "./routers/editProfile.js";
import profile from "./routers/profile.js";
import session from "express-session";
import passport from "passport";
import register from "./routers/register.js";
import login from "./routers/login.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(logger("dev"));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// app.get("/", (req, res) => {
//   console.log("TEST")
//   res.send("welcome");
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/", tutor);
app.use("/", login);
app.use("/", register);
app.use("/", profile);
app.use("/", editProfile);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
