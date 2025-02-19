import { runSnapshotTests } from '../../test-setup/run-snapshot-tests';

runSnapshotTests(__dirname, {
	plugins: ['prettier-plugin-svelte'],
	parser: 'svelte',
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
});
