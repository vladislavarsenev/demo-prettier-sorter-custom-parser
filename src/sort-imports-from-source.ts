import { extractImports } from './extract-imports';
import { groupImports } from './group-imports';
import { replaceSourceImports } from './replace-source-imports';
import { sortImports } from './sort-imports';
import { PrettierOptions } from './type';
import { flatten } from './utils/deep-flat';

export const sortImportsFromSource = (
	source: string,
	options?: Partial<PrettierOptions>,
) => {
	const importsInfo = extractImports(source);

	const groupedImports = groupImports(importsInfo.imports, {
		importOrder: options?.importOrder,
		importOrderSideEffects: options?.importOrderSideEffects,
	});

	const sortedImports = groupedImports.flatMap((imports) =>
		sortImports(imports),
	);

	return replaceSourceImports(
		source,
		sortedImports,
		importsInfo.startLoc,
		importsInfo.endLoc,
	);
};
