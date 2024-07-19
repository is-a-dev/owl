const fetch = require("node-fetch");
const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

async function authenticateGithub(code) {
    const response = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${GITHUB_ID}&client_secret=${GITHUB_SECRET}&code=${code}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    );

    const data = await response.json();

    const accessToken = data.access_token;

    const userResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    });

    const userData = await userResponse.json();
    const username = userData.login;
    const user_id = userData.id;

    const emailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    const emails = await emailResponse.json();

    return { username, user_id, emails };
}

module.exports = { authenticateGithub };
