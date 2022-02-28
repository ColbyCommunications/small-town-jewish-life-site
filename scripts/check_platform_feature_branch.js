const { exec } = require('child_process');

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
        console.log(`stdout: ${stdout}`);
    }
);
