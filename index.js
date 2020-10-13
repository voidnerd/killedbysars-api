const Koa = require("koa");
const app = new Koa();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const router = require("./routes");

const port = process.env.PORT || 8000;

//mongoose options
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

//connect to database
mongoose.connect(process.env.MONGO_URL, mongooseOptions).then(
  () => console.log("Database Connection established!"),
  (err) => console.log(err)
);

app.use(bodyParser());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
