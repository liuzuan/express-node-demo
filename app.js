import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userModel from "./models/userModel";
import router from "./routes/index";
import db from "./mongodb/db";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

router(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", {
        error: err
    });
});

export default app;
