const { exec } = require('child_process');

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

exec(
    `~/.platformsh/bin/platform db:size --environment=${args.branch} --format=plain --columns=used --no-header`,
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        let matches = stdout.match(/(\d+)/);
        const childSize = matches[0];
    }
);

exec(
    `~/.platformsh/bin/platform environment:info --format=plain parent`,
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        const parent = stdout;
    }
);

exec(
    `~/.platformsh/bin/platform db:size --environment=${parent} --format=plain --columns=used --no-header`,
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        const parentSize = stdout.match(/(\d+)/);
    }
);

if (parentSize === childSize) {
    console.log('Syncing databases!');
    exec(
        `~/.platformsh/bin/platform sync data --project=${args.id} --environment=dev --yes`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            const parentSize = stdout.match(/(\d+)/);
        }
    );
} else {
    console.log('Databases different! Not syncing');
}
