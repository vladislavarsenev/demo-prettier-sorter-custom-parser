import { extractImports } from './extract-imports';
import { groupImports } from './group-imports';
import { moveCommentFromImportTo } from './move-comment from-import-to';
import { replaceSourceImports } from './replace-source-imports';
import { sortImports } from './sort-imports';
import { PrettierOptions } from './type';

export const sortImportsFromSource = (
	source: string,
	options?: Partial<PrettierOptions>,
) => {
	const importsInfo = extractImports(source);

	const firstImport = importsInfo.imports.at(0);

	const groupedImports = groupImports(importsInfo.imports, {
		importOrder: options?.importOrder,
		importOrderSideEffects: options?.importOrderSideEffects,
	});

	const sortedImports = groupedImports.flatMap((imports) =>
		sortImports(imports),
	);

	if (firstImport) {
		moveCommentFromImportTo(sortedImports, firstImport);
	}

	return replaceSourceImports(
		source,
		sortedImports,
		importsInfo.positionRanges,
	);
};
