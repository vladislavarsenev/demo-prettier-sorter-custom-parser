import { ImportItem } from './types';
import { splitByImportName } from './utils/split-by-import-name';
import { splitByNamespaceFactor } from './utils/split-by-namespace-factor';
import { splitBySideEffectImports } from './utils/split-by-side-effect-imports';

type Options = {
	importOrder?: string[];
	importOrderSideEffects?: boolean;
	importOrderGroupNamespaceSpecifiers?: boolean;
};

export const groupImports = (imports: ImportItem[], options: Options) => {
	const sortOrder = options.importOrder ?? [];

	const importOrderGroupNamespaceSpecifiers =
		options.importOrderGroupNamespaceSpecifiers ?? false;
	const importOrderSideEffects = options.importOrderSideEffects ?? false;

	const initialGroup = [imports];

	const groups = splitByNamespaceFactor(
		splitByImportName(
			splitBySideEffectImports(initialGroup, {
				enabled: !importOrderSideEffects,
			}),
			{
				sortOrder,
				enabled: true,
			},
		),
		{
			enabled: importOrderGroupNamespaceSpecifiers,
		},
	);

	return groups;
};
