import { mkdir, copyFile } from 'node:fs/promises'
import { join } from 'node:path'

const rootDir = process.cwd()
const sourceDir = join(rootDir, 'src', 'imports')
const targetDir = join(rootDir, 'public', 'imports')

async function copyAsset(fileName) {
  await copyFile(join(sourceDir, fileName), join(targetDir, fileName))
}

await mkdir(targetDir, { recursive: true })
await Promise.all([
  copyAsset('Exterior_01.mp4'),
  copyAsset('Hurrem_Logo_Final.png'),
])
