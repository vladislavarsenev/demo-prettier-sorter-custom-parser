import { Config, RequiredOptions } from 'prettier';

export type ImportItem = {
	leadingComments?: string[];
	defaultImport?: string;
	namespaceImport?: string;
	namedImports?: {
		alias: string | undefined;
		name: string;
	}[];
	from: string;
};

export type ExtractedImports = {
	startLoc: number;
	endLoc: number;
	imports: ImportItem[];
};

export interface PluginConfig {
	importOrder: string[];
	importOrderSeparation?: boolean;
	importOrderSortSpecifiers?: boolean;
	importOrderGroupNamespaceSpecifiers?: boolean;
	importOrderCaseInsensitive?: boolean;
	importOrderSideEffects?: boolean;
	importOrderImportAttributesKeyword?: 'assert' | 'with' | 'with-legacy';
}

export interface PrettierOptions
	extends Partial<PluginConfig>,
		RequiredOptions {}

export type PrettierConfig = PluginConfig & Config;
