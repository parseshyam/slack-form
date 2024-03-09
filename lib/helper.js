// slack markdowns.
function pt(text) {
    return {
        type: "plain_text",
        text
    };
}

function md(text) {
    return {
        type: "mrkdwn",
        text
    };
}

function divider() {
    return {
        type: "divider"
    };
}

module.exports = {
    pt,
    md,
    divider
}