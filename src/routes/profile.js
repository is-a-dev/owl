module.exports = async (req, res) => {
    const user = req.user;
    const username = user.username;
    const user_id = user.user_id;
    const emails = user.emails;
    const message = 'test message';

    return res.render("profile", { username, user_id, emails, message, error: false, user: user });
}