import { runSnapshotTests } from '../../test-setup/run-snapshot-tests';

runSnapshotTests(__dirname, {
	importOrderSeparation: false,
	importOrderSideEffects: false,
});
