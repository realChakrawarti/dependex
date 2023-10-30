import path from 'path'

export const Constants = Object.freeze({
    NOT_AVAILABLE: 'N/A',
    MEGA_BYTE: 'MB',
    KILO_BYTE: 'KB',
    CHECK_ICON: '✅',
    CROSS_ICON: '❌'
})

const CURRENT_WORKING_DIR = process.cwd()
export const PACKAGE_JSON_PATH = path.join(CURRENT_WORKING_DIR, 'package.json')
export const DEPENDENCIES_FILE = path.join(CURRENT_WORKING_DIR, 'DEPENDENCIES.md')