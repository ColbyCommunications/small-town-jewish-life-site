const { exec, execSync } = require('child_process');

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
    '~/.platformsh/bin/platform environment:list --columns=ID --format=plain --no-header',
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(stdout.includes(args.branch));
        if (!stdout.includes(args.branch)) {
            execSync(
                `~/.platformsh/bin/platform environment:push -vv --target=${args.branch} --project=${args.id} --environment=${args.branch} --force`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }

                    console.log(stdout);
                }
            );

            execSync(
                `~/.platformsh/bin/platform environment:activate ${args.branch} --project=${args.id}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }

                    console.log(stdout);
                }
            );
        }
    }
);
