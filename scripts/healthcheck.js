const superagent = require('superagent');
var noCache = require('superagent-no-cache');

function getArgs() {
    const args = {};
    process.argv.slice(2, process.argv.length).forEach((arg) => {
        // long arg
        if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2, longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('');
            flags.forEach((flag) => {
                args[flag] = true;
            });
        }
    });
    return args;
}

// get args
const args = getArgs();

superagent
    .get(args.url)
    .use(noCache)
    .end((err, res) => {
        let message = {};

        switch (res.status / 100) {
            case 4:
                message = {
                    status: res.status,
                    text: `The site ${args.url} is returning a 400-level error!`,
                };
                break;
            case 5:
                message = {
                    status: res.status,
                    text: `The site ${args.url} is returning a 500-level error!`,
                };
                break;
        }

        return message;
    });
