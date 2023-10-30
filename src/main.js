#!/usr/bin/env node

import fs from 'fs'
import { readPackageJson, dependencyString } from './utils/helpers.js'
import { PACKAGE_JSON_PATH, DEPENDENCIES_FILE } from './utils/contants.js'
import ora from 'ora'

if (fs.existsSync(PACKAGE_JSON_PATH)) {
    const spinner = ora('Reading package.json').start()
    readPackageJson(PACKAGE_JSON_PATH, async (data) => {
        spinner.succeed('Success in reading package.json')
        const fetchInfoSpinner = ora('Getting package information').start()
        const content = `
# DEPENDENCIES
${await dependencyString(data.dependencies)}

# DEV-DEPENDENCIES
${await dependencyString(data.devDependencies)}
`
        fetchInfoSpinner.succeed('Fetch successful')
        const writingSpinner = ora('Writing data to file').start()
        fs.writeFile(DEPENDENCIES_FILE, content, { flag: 'w+' }, (err) => {
            if (err) {
                console.log(
                    'Error occured while writing DEPENDENCIES.md files: ',
                    err.message
                )
            }
        })
        writingSpinner.succeed('Wrote to file DEPENDENCIES.md')
    })
} else {
    console.log(
        "package.json isn't available in the current working directory!"
    )
}
