import { runSnapshotTests } from "../../test-setup/run-snapshot-tests";

runSnapshotTests(__dirname, {
    parser: 'svelte',
    plugins: ['prettier-plugin-svelte'],
    overrides: [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
});
