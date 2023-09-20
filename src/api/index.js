const BASE_URI = "https://registry.npmjs.org/"

export async function extractModuleInformation(name) {
    const response = await fetch(BASE_URI + `${name}/latest`)
    const data = response.json()
    return data
}