import { runSnapshotTests } from "../../test-setup/run-snapshot-tests";

runSnapshotTests(__dirname, {
    importOrder: [
        '^@core/(.*)$',
        '^@server/(.*)$',
        '^@ui/(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^[./]',
    ],
    importOrderSeparation: false,
});
