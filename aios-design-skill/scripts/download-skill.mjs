#!/usr/bin/env node
/**
 * download-skill.mjs — Zero-dependency skill packaging script.
 *
 * Packages the `aios-design/` skill folder into a distributable archive
 * (.tar.gz by default, .zip with --zip when bsdtar -a is available).
 *
 * Usage:
 *   node scripts/download-skill.mjs           # → dist/aios-design-skill.tar.gz
 *   node scripts/download-skill.mjs --zip     # → dist/aios-design-skill.zip (if supported)
 *
 * No npm install required. Uses the system `tar` command (built into
 * Windows 10+ as bsdtar, and all macOS/Linux systems).
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// --- Config --------------------------------------------------------------

const SKILL_ROOT = resolve(__dirname, '..')            // aios-design-skill/
const SKILL_FOLDER = join(SKILL_ROOT, 'aios-design') // the folder to package
const DIST_DIR = join(SKILL_ROOT, 'dist')
const ARCHIVE_BASENAME = 'aios-design-skill'

// Directories/files excluded from the archive
const EXCLUDE_PATTERNS = ['node_modules', 'dist', '.DS_Store', '.git']

// --- Helpers -------------------------------------------------------------

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function tarIsAvailable() {
  try {
    execFileSync('tar', ['--version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

/**
 * Build a tar exclude-argument list from EXCLUDE_PATTERNS.
 * Each entry excludes the pattern at any depth inside the archive root.
 */
function buildExcludeArgs(archiveRootName) {
  return EXCLUDE_PATTERNS.flatMap((p) => [
    '--exclude',
    `${archiveRootName}/${p}`,
    '--exclude',
    `${archiveRootName}/**/${p}`,
  ])
}

// --- Main ----------------------------------------------------------------

function main() {
  const wantZip = process.argv.includes('--zip')

  // 1. Validate source folder
  if (!existsSync(SKILL_FOLDER)) {
    console.error(`[error] Skill folder not found: ${SKILL_FOLDER}`)
    console.error('        Run this script from the aios-design-skill/ directory.')
    process.exit(1)
  }

  const skillStat = statSync(SKILL_FOLDER)
  if (!skillStat.isDirectory()) {
    console.error(`[error] Not a directory: ${SKILL_FOLDER}`)
    process.exit(1)
  }

  // 2. Validate tar availability
  if (!tarIsAvailable()) {
    console.error('[error] `tar` command not found on this system.')
    console.error('       Windows 10+, macOS, and Linux all ship tar by default.')
    console.error('       If you are on an older Windows system, install bsdtar or')
    console.error('       use the manual install: git clone + cp -r (see README.md).')
    process.exit(1)
  }

  // 3. Prepare dist/ (clean previous output)
  mkdirSync(DIST_DIR, { recursive: true })
  for (const f of readdirSync(DIST_DIR)) {
    if (f.startsWith(ARCHIVE_BASENAME)) {
      rmSync(join(DIST_DIR, f), { recursive: true, force: true })
    }
  }

  // 4. Determine output format
  const archiveRootName = 'aios-design'
  const ext = wantZip ? '.zip' : '.tar.gz'
  const outputFile = join(DIST_DIR, `${ARCHIVE_BASENAME}${ext}`)

  // 5. Build tar args
  //    We tar from SKILL_ROOT so the archive contains `aios-design/` as the
  //    top-level entry. Exclude patterns are relative to that root.
  const tarArgs = [
    '-c',                              // create
    ...(wantZip ? ['-a'] : ['-z']),    // -a auto-format (zip) or -z gzip
    '-f', outputFile,                  // output file
    ...buildExcludeArgs(archiveRootName),
    archiveRootName,                   // source folder (relative to cwd)
  ]

  // 6. Run tar
  try {
    execFileSync('tar', tarArgs, {
      cwd: SKILL_ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (err) {
    if (wantZip) {
      // bsdtar -a may fail to produce zip on some systems; fall back to .tar.gz
      console.warn('[warn] --zip failed (bsdtar -a not supported here). Falling back to .tar.gz')
      const fallbackArgs = [
        '-c', '-z',
        '-f', outputFile.replace(/\.zip$/, '.tar.gz'),
        ...buildExcludeArgs(archiveRootName),
        archiveRootName,
      ]
      try {
        execFileSync('tar', fallbackArgs, {
          cwd: SKILL_ROOT,
          stdio: ['ignore', 'pipe', 'pipe'],
        })
      } catch (err2) {
        console.error('[error] tar failed:', err2.message)
        process.exit(1)
      }
      // Update outputFile to the fallback path for the success message
      const fallbackOutput = outputFile.replace(/\.zip$/, '.tar.gz')
      reportSuccess(fallbackOutput)
      return
    }
    console.error('[error] tar failed:', err.message)
    process.exit(1)
  }

  reportSuccess(outputFile)
}

function reportSuccess(outputFile) {
  const size = statSync(outputFile).size
  const home = process.env.HOME || process.env.USERPROFILE || '~'

  console.log('')
  console.log('  ✓ Skill packaged successfully')
  console.log('')
  console.log(`  Archive:  ${outputFile}`)
  console.log(`  Size:     ${formatBytes(size)}`)
  console.log('')
  console.log('  Install with:')
  console.log(`    tar -xzf "${outputFile}" -C "${home}/.claude/skills/"`)
  console.log('')
  console.log('  Then restart Claude Code — the /aios-design skill will be available.')
  console.log('')
}

main()
