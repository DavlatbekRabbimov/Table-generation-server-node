
const DELETE = 0;
const ADD = 1;
const SWAP = 2;
function generateErrors(text, errors) {
    try {
        const maxLength = 100;
        for (let i = 0; i < errors; i++) {
            const errorType = Math.floor(Math.random() * 3);
            const position = Math.floor(Math.random() * text.length);

            switch (errorType) {
                case DELETE:
                    text = text.slice(0, position) + text.slice(position + 1);
                    break;
                case ADD:
                    if (text.length < maxLength) {
                        const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                        text = text.slice(0, position) + char + text.slice(position);
                    }
                    break;
                case SWAP:
                    if (position < text.length - 1) {
                        text = text.slice(0, position) + text.charAt(position + 1) + text.charAt(position) + text.slice(position + 2);
                    }
                    break;
            }
        }

        return text;
    } catch (err) {
        console.log(err);
    }

}

module.exports = generateErrors;
