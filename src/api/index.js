const BASE_URI = "https://registry.npmjs.org/"

export async function extractModuleInformation(name) {
    try {
        const response = await fetch(BASE_URI + `${name}/latest`)
        const data = response.json()
        return data
    } catch (err) {
        console.log(`Unable to fetch package details -- ${name}`)
    }
}