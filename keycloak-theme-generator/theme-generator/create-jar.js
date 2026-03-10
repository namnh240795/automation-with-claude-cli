import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const themeDir = path.join(projectRoot, 'dist-theme', 'custom')
const outputDir = path.join(projectRoot, 'dist-jar')
const jarFile = path.join(outputDir, 'keycloak-custom-theme.jar')

/**
 * Create JAR archive for theme deployment
 */
function createJarArchive() {
  console.log('📦 Creating JAR archive for production deployment...')

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Create temporary staging directory
  const stagingDir = path.join(outputDir, 'staging')
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true })
  }
  fs.mkdirSync(stagingDir, { recursive: true })

  // Create theme structure in staging
  const themeStagingDir = path.join(stagingDir, 'theme', 'custom')
  fs.mkdirSync(themeStagingDir, { recursive: true })

  // Copy login theme
  const loginSource = path.join(themeDir, 'login')
  const loginDest = path.join(themeStagingDir, 'login')
  if (fs.existsSync(loginSource)) {
    copyDirectory(loginSource, loginDest)
  }

  // Copy account theme
  const accountSource = path.join(themeDir, 'account')
  const accountDest = path.join(themeStagingDir, 'account')
  if (fs.existsSync(accountSource)) {
    copyDirectory(accountSource, accountDest)
  }

  // Create META-INF directory
  const metaInfDir = path.join(stagingDir, 'META-INF')
  fs.mkdirSync(metaInfDir, { recursive: true })

  // Create keycloak-themes.json
  const themesJson = {
    themes: [
      {
        name: 'custom',
        types: ['login', 'account']
      }
    ]
  }
  fs.writeFileSync(
    path.join(metaInfDir, 'keycloak-themes.json'),
    JSON.stringify(themesJson, null, 2)
  )

  // Create JAR using jar command or zip
  try {
    if (fs.existsSync(jarFile)) {
      fs.unlinkSync(jarFile)
    }

    // Try using jar command first (usually available with Java)
    try {
      execSync(`cd "${stagingDir}" && jar cf "${jarFile}" *`, { stdio: 'inherit' })
    } catch (jarError) {
      // Fall back to zip command
      try {
        execSync(`cd "${stagingDir}" && zip -r "${jarFile}" *`, { stdio: 'inherit' })
      } catch (zipError) {
        console.error('❌ Neither jar nor zip command found. Please install either Java JDK or a zip utility.')
        console.log('💡 Tip: You can manually create the JAR by compressing the staging directory contents.')
        console.log(`📁 Staging directory: ${stagingDir}`)
        process.exit(1)
      }
    }

    // Clean up staging directory
    fs.rmSync(stagingDir, { recursive: true, force: true })

    console.log('✅ JAR archive created successfully!')
    console.log(`📁 JAR location: ${jarFile}`)
    console.log('')
    console.log('To deploy this theme to Keycloak:')
    console.log('1. Copy the JAR file to Keycloak/providers directory')
    console.log('2. Restart Keycloak')
    console.log('3. Select the "custom" theme in your realm settings')
    console.log('')
    console.log('Example:')
    console.log(`  cp ${jarFile} /path/to/keycloak/providers/`)
    console.log('  /path/to/keycloak/bin/kc.sh restart')

  } catch (error) {
    console.error('❌ Error creating JAR archive:', error)
    process.exit(1)
  }
}

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Run the JAR creation
try {
  createJarArchive()
} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
