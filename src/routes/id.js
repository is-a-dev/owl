const { EncryptData, DecryptData } = require("../util/idGen");

module.exports = async (req, res) => {
    const username = req.params.username;
    const user_id = req.params.user_id
    console.log(req.body);
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: "No email provided" });
    }
    if (email.length < 5) {
        return res.status(400).json({ error: "Email too short" });
    }
    if (email.length > 100) {
        return res.status(400).json({ error: "Email too long" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ error: "Invalid email" });
    }
    if (!user_id) {
        return res.status(400).json({ error: "No user_id provided" });
    }
    if (!username) {
        return res.status(400).json({ error: "No username provided" });
    }

    const data = { user_id, username, email };
    const token = await EncryptData(data);

    res.render("id", { message: "", token });

}