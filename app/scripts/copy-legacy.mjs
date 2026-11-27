// Until Gate 5 moves them across, the current demo pages are copied into the build unchanged,
// so every demo link still opens a working page. Product pages moved to Astro at Gate 4.
import { cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
for (const dir of ['demos']) {
  await access(root + dir);
  await cp(root + dir, dist + dir, { recursive: true, force: false, errorOnExist: false });
  console.log(`copied legacy ${dir}/ into dist`);
}
