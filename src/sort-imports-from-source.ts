import { extractImports } from './extract-imports';
import { groupImports } from './group-imports';
import { moveCommentFromImportTo } from './move-comment from-import-to';
import { replaceSourceImports } from './replace-source-imports';
import { sortImports } from './sort-imports';
import { GroupedImportItem, PrettierOptions } from './types';

export const sortImportsFromSource = (
	source: string,
	options?: Partial<PrettierOptions>,
) => {
	const importsInfo = extractImports(source);

	const firstImport = importsInfo.imports.at(0);

	const groupedImports = groupImports(importsInfo.imports, options ?? {});

	const sortedGroupedImports = groupedImports.map((imports) =>
		sortImports(imports, options),
	) as GroupedImportItem[];

	if (firstImport) {
		moveCommentFromImportTo(sortedGroupedImports, firstImport);
	}

	const result = replaceSourceImports(
		source,
		sortedGroupedImports,
		importsInfo.positionRanges,
		options,
	);

	return result;
};
