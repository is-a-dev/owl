const bcrypt = require("bcrypt");
const { signToken } = require("../util/jwt");
const { authenticateGithub } = require("../util/gitAuth");
const fetch = require("node-fetch");


module.exports = async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }
    const { username, user_id, emails } = await authenticateGithub(code);
    const access_token = signToken({ username: username, user_id: user_id, emails: emails });
    // set cookie
    res.cookie("access_token", access_token, { httpOnly: true });
    res.redirect("/profile");
}