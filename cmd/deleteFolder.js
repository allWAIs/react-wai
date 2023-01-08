import { readdirSync, rmSync } from 'fs';

readdirSync('./dist', { withFileTypes: true }).forEach(async (file) => {
  if (file.isDirectory()) {
    await rmSync('./dist/' + file.name, { recursive: true, force: true });
  }
});
