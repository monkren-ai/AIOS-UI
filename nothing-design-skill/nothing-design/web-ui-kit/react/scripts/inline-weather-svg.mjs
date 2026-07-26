import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const baseDir = join(__dirname, '../src/assets/weather/')
const outFile = join(__dirname, '../src/widgets/weather-svg-strings.ts')

const files = [
  ['sunny', 'sunny'],
  ['cloudy', 'cloudy'],
  ['partly-cloudy-day', 'partlyCloudyDay'],
  ['partly-cloudy-night', 'partlyCloudyNight'],
  ['rain-or-mist', 'rainOrMist'],
  ['snow-fall', 'snowFall'],
  ['thunder', 'thunder'],
]

const lines = files.map(([fileName, varName]) => {
  const content = readFileSync(join(baseDir, `${fileName}.svg`), 'utf8')
  const minified = content.replace(/<\?xml[^?]*\?>\s*/, '').replace(/\s+/g, ' ').trim()
  return `const ${varName}Raw = ${JSON.stringify(minified)}`
})

writeFileSync(outFile, `${lines.join('\n')}\n`, 'utf8')
console.log('Inline weather SVG strings written to src/widgets/weather-svg-strings.ts')
