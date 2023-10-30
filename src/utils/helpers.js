import fs from 'fs'
import { Constants } from './contants.js'
import { compareVersions } from 'compare-versions'
import { extractModuleInformation } from '../api/index.js'
import ora from 'ora'

export function formatProperSize(sizeInBytes) {
    if (!sizeInBytes) {
        return Constants.NOT_AVAILABLE
    }
    let size
    size = (sizeInBytes / 1000).toFixed(2)
    if (size > 1000) {
        size = (size / 1000).toFixed(2) + Constants.MEGA_BYTE
    } else {
        size += Constants.KILO_BYTE;
    }

    return size
}

export function cleanURL(url) {
    if (url) {
        return url.split("git+")[1]
    }
}

export function readPackageJson(path, cb) {
    let parsedData
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        parsedData = JSON.parse(data)
        cb(parsedData)
    })
}

export function compareBetweenVersion(currentVersion, latestVersion) {
    const upgradeAvailable = compareVersions(
        currentVersion.length > 12 ? '0' : currentVersion,
        !latestVersion ? '0' : latestVersion,
        '<='
    )

    if (upgradeAvailable) {
        return Constants.CHECK_ICON
    } else {
        return Constants.CROSS_ICON
    }
}

export async function dependencyString(dependencies) {
    const fetchSpinner = ora('Fetching package informations').start()
    let content = ''
    for (let item of Object.entries(dependencies)) {
        fetchSpinner.text = `> ${item[0]}`
        const data = await extractModuleInformation(item[0])

        const {
            name,
            version,
            description,
            homepage,
            repository,
            dist,
        } = data

        content += `| ${name ?? item[0]} | ${
            homepage ?? Constants.NOT_AVAILABLE
        } | ${cleanURL(repository?.url) ?? Constants.NOT_AVAILABLE} | ${
            description ?? Constants.NOT_AVAILABLE
        } | ${item[1]} | ${
            version ?? Constants.NOT_AVAILABLE
        } | ${compareBetweenVersion(
            item[1],
            version
        )} | ${formatProperSize(dist?.unpackedSize)} |\n`
    }
    fetchSpinner.stop()
    return `
| Package name | Homepage | GitHub | Description | Installed version | Latest version | Upgrade available | Size |
| - | - | - | - | - | - | - | - |    
${content}        
`
}