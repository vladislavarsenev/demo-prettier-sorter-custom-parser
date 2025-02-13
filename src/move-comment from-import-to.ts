import { ImportItem } from './type';

export const moveCommentFromImportTo = (
	imports: ImportItem[],
	fromImport: ImportItem,
) => {
	if (imports.length <= 1) return imports;

	const leadingComments = fromImport.leadingComments ?? [];

	fromImport.leadingComments = [];

	const topImportClause = imports.at(0);

	if (!topImportClause) return;

	const firstImports = topImportClause.leadingComments ?? [];

	topImportClause.leadingComments = [...leadingComments, ...firstImports];
};
