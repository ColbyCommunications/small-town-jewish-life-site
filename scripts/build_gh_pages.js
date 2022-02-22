// const { exec } = require('child_process');
const fs = require('fs');

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

console.log(args);

// make branch and commit dir regardless of if it exists
fs.mkdir(`./public/lighthouse/${args.branch}/${args.commit}`);

// process branches.json
fs.access('./public/lighthouse/branches.json', fs.F_OK, (err) => {
    if (err) {
        fs.writeFile(
            './public/lighthouse/branches.json',
            JSON.stringify({
                branches: [{ name: args.branch }],
            }),
            (err) => {
                if (err) console.log(err);
                else {
                    console.log('branches.json written successfully\n');
                }
            }
        );
        return;
    }

    fs.readFile('./public/lighthouse/branches.json', (err, data) => {
        if (err) throw err;
        let branches = JSON.parse(data);
        let noBranch = true;
        branches.forEach((branch) => {
            if (branch.name === args.branch) {
                noBranch = false;
            }
        });

        if (noBranch) {
            let data = Object.assign(branches, {
                branches: [{ name: args.branch }],
            });

            fs.writeFile('./public/lighthouse/branches.json', JSON.stringify(data), (err) => {
                if (err) console.log(err);
                else {
                    console.log('branches.json written successfully\n');
                }
            });
        }
    });
});

// process commits.json
fs.access('./public/lighthouse/commits.json', fs.F_OK, (err) => {
    if (err) {
        fs.writeFile(
            './public/lighthouse/commits.json',
            JSON.stringify({
                commits: [{ hash: args.commit, date: Date.now() }],
            }),
            (err) => {
                if (err) console.log(err);
                else {
                    console.log('branches.json written successfully\n');
                }
            }
        );
        return;
    }

    fs.readFile('./public/lighthouse/commits.json', (err, data) => {
        if (err) throw err;
        let commits = JSON.parse(data);
        let noCommit = true;
        commits.forEach((commit) => {
            if (commit.hash === args.branch) {
                noBranch = false;
            }
        });

        if (noCommit) {
            let data = Object.assign(commits, {
                commits: [{ name: args.commit, date: Date.now() }],
            });

            fs.writeFile('./public/lighthouse/commits.json', JSON.stringify(data), (err) => {
                if (err) console.log(err);
                else {
                    console.log('commits.json written successfully\n');
                }
            });
        }
    });
});
