#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import { extractModuleInformation } from './api/index.js'

// import yargs from 'yargs'
// import { hideBin } from 'yargs/helpers'
// yargs(hideBin(process.argv))
// .command(
//     'curl <url>',
//     'fetch the contents of the URL',
//     () => {},
//     (argv) => {
//         console.info(argv)
//     }
// )
// .demandCommand(1)
// .parse()

const CURRENT_WORKING_DIR = process.cwd()
const PACKAGE_JSON_PATH = path.join(CURRENT_WORKING_DIR, 'package.json')
const DEPENDENCIES_FILE = path.join(CURRENT_WORKING_DIR, 'DEPENDENCIES.md')

// utils.js

function formatProperSize(sizeInBytes) {
    if (!sizeInBytes) {
        return '0B'
    }
    let size
    size = (sizeInBytes / 1000).toFixed(2)
    if (size > 1000) {
        size = (size / 1000).toFixed(2) + 'MB'
    } else {
        size += 'KB'
    }

    return size
}

function cleanURL(url) {
    if (url) {
        return url.split("git+")[1]
    }
}

function readPackageJson(path, cb) {
    let parsedData
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        parsedData = JSON.parse(data)
        cb(parsedData)
    })
}

if (fs.existsSync(PACKAGE_JSON_PATH)) {
    readPackageJson(PACKAGE_JSON_PATH, async (data) => {
        const dependencyString = async (dependencies) => {
            let content = ''
            for (let item of Object.entries(dependencies)) {
                const data = await extractModuleInformation(item[0])

                const {
                    name,
                    version,
                    description,
                    homepage,
                    repository,
                    dist,
                } = data

                content += `| ${name ?? item[0]} | ${homepage ?? '-'} | ${cleanURL(repository?.url) ?? '-'} | ${description ?? '-'} | ${
                    item[1]
                } | ${version ?? '-'} | ${formatProperSize(dist?.unpackedSize)} |\n`
            }
            return content
        }

        const content = `
# DEPENDENCIES
| Package name | Homepage | GitHub | Description | Installed version | Latest version | Size |
| - | - | - | - | - | - | - |
${await dependencyString(data.dependencies)}


# DEV-DEPENDENCIES
| Package name | Homepage | GitHub |Description | Installed version | Latest version | Size |
| - | - | - | - | - | - | - |
${await dependencyString(data.devDependencies)}
        `

        fs.writeFile(DEPENDENCIES_FILE, content, { flag: 'w+' }, (err) => {})
    })
} else {
    console.log(
        "package.json isn't available in the current working directory!"
    )
}
