import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { sortImportsFromSource } from './sort-imports-from-source';
import { type SupportOptions } from 'prettier';

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
	importOrderImportAttributesKeyword: {
		type: 'string',
		category: 'Global',
		default: 'with',
		description: 'Provide a keyword for import attributes',
	},
};

const plugin = {
	parsers: {
		typescript: {
			...typescriptParsers.typescript,
			preprocess: sortImportsFromSource,
		},
	},
	options,
};

export default plugin;
