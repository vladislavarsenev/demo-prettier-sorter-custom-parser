import { Token } from 'moo';
import { Config, RequiredOptions } from 'prettier';

export type NameImportItem = {
	name: string;
	alias?: string;
	text: string; // test2 as test3, test4
};

export type ImportItem = {
	prefaceText?: string;
	hasNamespaceImport: boolean;
	hasDefaultImport: boolean;
	hasNamedImports: boolean;
	hasSideEffectImport: boolean;
	text: string; // import module, {<NAMED_IMPORT_PLACEHOLDER>} from 'module'
	from: string; // module
	namedImports?: NameImportItem[];
};

export type GroupedImportItem = ImportItem[];

export type ExtractedImports = {
	positionRanges: {
		startLoc: number;
		endLoc: number;
	}[];
	imports: ImportItem[];
};

export interface PluginConfig {
	importOrder: string[];
	importOrderSeparation?: boolean;
	importOrderSortSpecifiers?: boolean;
	importOrderGroupNamespaceSpecifiers?: boolean;
	importOrderCaseInsensitive?: boolean;
	importOrderSideEffects?: boolean;
}

export interface PrettierOptions
	extends Partial<PluginConfig>,
		RequiredOptions {}

export type PrettierConfig = PluginConfig & Config;
export type NearleyData = (string | Token | NearleyData)[];
