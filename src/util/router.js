const { Router } = require("express");
const { authenticateToken, signToken } = require("./jwt");

const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();


const router = Router();
const routes = require("./routes");

router.get("/__/auth/handler", upload.any(), async (req, res) => {
    routes.auth(req, res);
});

router.post("/id/:user_id/:username", upload.any(), async (req, res) => {
    routes.id(req, res);
});

router.get("/profile", authenticateToken, async (req, res) => {
    routes.profile(req, res);
});

router.get("/demo", authenticateToken, async (req, res) => {
    user = req.user;
    res.json({ user });
});

router.get("/", async (req, res) => {
    res.render("index", { message: "" });
}); 



module.exports = router;