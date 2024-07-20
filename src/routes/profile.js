module.exports = async (req, res) => {
    const user = req.user;
    const username = user.username;
    const user_id = user.user_id;
    const emails = user.emails;
    const message = 'test message';

    let filteredEmails = emails.filter(function(e) {
        return e.verified && !e.email.endsWith("@users.noreply.github.com");
    })

    return res.render("profile", { username, user_id, emails: filteredEmails, message, error: false, user: user });
}
