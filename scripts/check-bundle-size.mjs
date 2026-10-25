import { readdir, readFile, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const limits = {
  '.js': 150 * 1024,
  '.css': 30 * 1024,
}

const assetsDirectory = fileURLToPath(new URL('../dist/assets/', import.meta.url))
let assetNames

try {
  assetNames = await readdir(assetsDirectory)
} catch {
  console.error('Bundle output is missing. Run npm run build before npm run check:bundle.')
  process.exit(1)
}

const checkedAssets = []
let failed = false

for (const name of assetNames) {
  const extension = extname(name)
  const limit = limits[extension]
  if (!limit) continue

  const path = join(assetsDirectory, name)
  const [contents, file] = await Promise.all([readFile(path), stat(path)])
  const gzipBytes = gzipSync(contents).byteLength
  checkedAssets.push({ name, rawBytes: file.size, gzipBytes, limit })
  if (gzipBytes > limit) failed = true
}

if (checkedAssets.length === 0) {
  console.error('No JavaScript or CSS assets were found in dist/assets.')
  process.exit(1)
}

for (const asset of checkedAssets) {
  console.log(`${asset.name}: ${(asset.rawBytes / 1024).toFixed(2)} KiB raw, ${(asset.gzipBytes / 1024).toFixed(2)} KiB gzip (limit ${(asset.limit / 1024).toFixed(0)} KiB)`)
}

if (failed) {
  console.error('A production asset exceeds its gzip size budget.')
  process.exit(1)
}
