// Until Gates 4 and 5 move them across, the current product and demo pages are copied into the
// build unchanged, so every link from the new homepage and menus still opens a working page.
import { cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
for (const dir of ['products', 'demos']) {
  await access(root + dir);
  await cp(root + dir, dist + dir, { recursive: true, force: false, errorOnExist: false });
  console.log(`copied legacy ${dir}/ into dist`);
}
