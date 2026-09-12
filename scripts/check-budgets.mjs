import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

const assets = await readdir(new URL("../dist/assets/", import.meta.url));
const entry = assets.find((file) => /^index-.*\.js$/.test(file));
assert(entry, "Build first: the main JavaScript bundle is missing.");
const entryGzip = gzipSync(
  await readFile(new URL(`../dist/assets/${entry}`, import.meta.url)),
).length;
assert(
  entryGzip < 85_000,
  `Entry JavaScript exceeded the 85 KB gzip budget: ${entryGzip}`,
);
const hero = await stat(
  new URL("../dist/media/hero-loop.mp4", import.meta.url),
);
assert(hero.size < 750_000, `Hero video exceeded 750 KB: ${hero.size}`);
const media = await readdir(new URL("../dist/media/", import.meta.url));
let total = 0;
for (const file of media.filter((file) => file.endsWith(".mp4"))) {
  const bytes = await readFile(
    new URL(`../dist/media/${file}`, import.meta.url),
  );
  total += bytes.length;
  // A moov atom before mdat permits progressive playback without downloading the end.
  assert(
    bytes.indexOf("moov") >= 0 && bytes.indexOf("moov") < bytes.indexOf("mdat"),
    `${file}: MP4 metadata must precede media data`,
  );
  if (file !== "hero-loop.mp4")
    assert(
      media.includes(file.replace(".mp4", ".webp")),
      `${file}: missing poster`,
    );
}
assert(total < 16_000_000, `Video total exceeded 16 MB: ${total}`);
assert(
  !assets.some((file) => file.endsWith(".mp4")),
  "Original source video accidentally imported into the bundle.",
);
console.log(
  JSON.stringify(
    { entryGzipBytes: entryGzip, heroBytes: hero.size, totalVideoBytes: total },
    null,
    2,
  ),
);
