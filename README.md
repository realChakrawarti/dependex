Reads the `package.json` from the root of the project directory and outputs that into a separate file `DEPENDENCIES.md` in a tabular format which will include, 2 sections **DEVDEPENDENCIES** and **DEPENDENCIES** tables with following columns.

| Package name | Link (GitHub/GitLab / npm) | Author       | Description       | Installed Version | Latest version available (minor as semver) | Size    | Tags          |
| ------------ | -------------------------- | ------------ | ----------------- | ----------------- | ------------------------------------------ | ------- | ------------- |
| react        | npm.io/react               | Facebook Inc | Front-end library | 18.0.2            | 18.0.3                                     | 4.03MiB | react, ui, ux |

Once could sort based on gzip size from the CLI command.

Steps:

- Running `dpx` should read all the dependencies from `package.json` with versions currently installed and latest available version.
-

APIs to use:

1. https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md - https://registry.npmjs.org/
2. Reference: https://www.edoardoscibona.com/exploring-the-npm-registry-api

Make use of:

1. https://github.com/changesets/changesets -- to manage changelogs either manually or using CI


## References:
1. Read `package.json` from file-system: https://heynode.com/tutorial/readwrite-json-files-nodejs/