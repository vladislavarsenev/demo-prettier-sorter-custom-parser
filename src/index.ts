import { type SupportOptions } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as flowParsers } from 'prettier/plugins/flow';
import { parsers as htmlParsers } from 'prettier/plugins/html';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { sortImportsFromSource } from './sort-imports-from-source';
import { createSvelteParsers } from './utils/create-svelte-parsers';

const svelteParsers = createSvelteParsers();

const options: SupportOptions = {
	importOrder: {
		type: 'path',
		category: 'Global',
		array: true,
		default: [{ value: [] }],
		description: 'Provide an order to sort imports.',
	},
	importOrderCaseInsensitive: {
		type: 'boolean',
		category: 'Global',
		default: false,
		description: 'Provide a case sensitivity boolean flag',
	},
	importOrderSeparation: {
		type: 'boolean',
		category: 'Global',
		default: false,
		description: 'Should imports be separated by new line?',
	},
	importOrderGroupNamespaceSpecifiers: {
		type: 'boolean',
		category: 'Global',
		default: false,
		description:
			'Should namespace specifiers be grouped at the top of their group?',
	},
	importOrderSortSpecifiers: {
		type: 'boolean',
		category: 'Global',
		default: false,
		description: 'Should specifiers be sorted?',
	},
	importOrderSideEffects: {
		type: 'boolean',
		category: 'Global',
		default: true,
		description: 'Should side effects be sorted?',
	},
};

const plugin = {
	parsers: {
		babel: {
			...babelParsers.babel,
			preprocess: sortImportsFromSource,
		},
		typescript: {
			...typescriptParsers.typescript,
			preprocess: sortImportsFromSource,
		},
		flow: {
			...flowParsers.flow,
			preprocess: sortImportsFromSource,
		},
		vue: {
			...htmlParsers.vue,
			preprocess: sortImportsFromSource,
		},
		...(svelteParsers.parsers
			? {
					svelte: {
						...svelteParsers.parsers.svelte,
						preprocess: sortImportsFromSource,
					},
				}
			: {}),
	},
	options,
};

export default plugin;
