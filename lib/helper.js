// slack markdowns.
function pt(text, maxCharLimit = null) {
    return {
        type: "plain_text",
        text: trimText(text, maxCharLimit)
    };
}

function md(text, maxCharLimit = null) {
    return {
        type: "mrkdwn",
        text: trimText(text, maxCharLimit)
    };
}

function divider() {
    return {
        type: "divider"
    };
}

function trimText(text, maxCharLimit, trimDelimiter = "...") {
    if (maxCharLimit) {
        const safeBufferLenght = trimDelimiter.length + 2;
        if (text && text.length > maxCharLimit - safeBufferLenght) {
            return text.slice(0, maxCharLimit).concat(trimDelimiter);
        }
    }
    return text;
}

module.exports = {
    pt,
    md,
    divider
}