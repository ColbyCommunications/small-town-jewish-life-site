const { spawn } = require('child_process');
const environmentList = spawn('~/.platformsh/bin/platform environment:list', [
    '--columns=ID',
    '--format=plain',
    '--no-header',
]);

environmentList.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
