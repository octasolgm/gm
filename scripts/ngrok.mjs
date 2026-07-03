import ngrok from 'ngrok';
import net from 'net';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function loadEnvFile() {
  const file = path.join(rootDir, '.env.ngrok');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile();

const WEB_PORT = Number(process.env.WEB_PORT || 3000);
const API_PORT = Number(process.env.API_PORT || 4000);

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' }, () => {
      socket.end();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
  });
}

async function resolveWebPort() {
  if (await isPortOpen(WEB_PORT)) return WEB_PORT;
  if (WEB_PORT === 3000 && (await isPortOpen(3001))) return 3001;
  throw new Error(
    `Web dev server not running on port ${WEB_PORT}. Start it first: npm run dev:web`,
  );
}

async function main() {
  await ngrok.kill();

  const port = await resolveWebPort();
  const apiUp = await isPortOpen(API_PORT);

  if (!apiUp) {
    console.warn(`Warning: API not detected on port ${API_PORT}. Contact form may fail.`);
    console.warn('Start API with: npm run dev:api\n');
  }

  const token = process.env.NGROK_AUTHTOKEN;
  if (!token) {
    console.error(
      '\nNGROK_AUTHTOKEN is required.\n\n' +
        '1. Sign up free: https://dashboard.ngrok.com/signup\n' +
        '2. Copy token:  https://dashboard.ngrok.com/get-started/your-authtoken\n' +
        '3. Create file:  .env.ngrok  in project root with:\n' +
        '   NGROK_AUTHTOKEN=your_token_here\n' +
        '4. Run again:    npm run tunnel\n',
    );
    process.exit(1);
  }

  const options = {
    addr: port,
    authtoken: token,
  };

  const url = await ngrok.connect(options);

  console.log('\n========================================');
  console.log('  Portfolio is live on ngrok');
  console.log('========================================');
  console.log(`  Public URL:  ${url}`);
  console.log(`  Local web:   http://localhost:${port}`);
  console.log(`  Local API:   http://localhost:${API_PORT}/api`);
  console.log('  API proxy:   /api/* → NestJS (Vite dev proxy)');
  console.log('========================================\n');
  console.log('Share this link:', url);
  console.log('Press Ctrl+C to stop the tunnel.\n');

  process.on('SIGINT', async () => {
    await ngrok.disconnect();
    await ngrok.kill();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('ngrok failed:', err.message);
  process.exit(1);
});
