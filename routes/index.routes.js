const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.use("/", require("./user.routes"))
router.use("/", require("./restaurant.routes"))
router.use("/", require("./groups.routes") )


module.exports = router