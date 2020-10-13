const Router = require("@koa/router");
const router = new Router();

const controllers = require("./controllers");

router.get("/", (ctx, next) => {
  ctx.body = {
    message: "KilledBySars the API",
  };
});

router.get("/api/victims", controllers.victim.getAll);
router.get("/api/victims/:id", controllers.victim.getOne);
router.post("/api/victims", controllers.victim.store);

module.exports = router;
