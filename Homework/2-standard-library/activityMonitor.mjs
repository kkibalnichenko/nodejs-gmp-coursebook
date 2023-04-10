import { appendFile } from 'fs';
import { platform } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const promisifiedExec = promisify(exec);
const promisifiedAppend = promisify(appendFile);

const isMac = platform() === 'darwin';
const isWindows = platform() === 'win32';
const isLinux = platform() === 'linux';

const LOG_FILE_NAME = 'activityMonitor.log';

function panic(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

async function logMessage(message) {
  await promisifiedAppend(LOG_FILE_NAME, `${Math.floor(Date.now() / 1000)} : ${message}\n`);
}

async function getTopCPUProcess() {
  const cmd = isWindows ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
  try {
    const { stdout } = await promisifiedExec(cmd);
    return stdout.replace('\n', '');
  } catch (err) {
    logMessage(err.message);
  }
}

function displayMessage(message) {
  let msg = '';
  if (message.length > process.stdout.columns) {
    msg = `${message.substring(0, process.stdout.columns - 4)}...`;
  } else {
    msg = message + ' '.repeat(process.stdout.columns - message.length - 1);
  }
  process.stdout.write(`${msg}\r`);
}

if (!isMac && !isWindows && !isLinux) {
  panic('Unsupported platform');
}

setInterval(async () => {
  displayMessage(await getTopCPUProcess());
}, 100);

setInterval(async () => {
  logMessage(await getTopCPUProcess());
}, 60_000);
