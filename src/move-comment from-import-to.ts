import { GroupedImportItem, ImportItem } from './type';

export const moveCommentFromImportTo = (
	groupedImports: GroupedImportItem[],
	fromImport: ImportItem,
) => {
	const leadingComments = fromImport.leadingComments ?? [];

	fromImport.leadingComments = [];

	const topImportClause = groupedImports.at(0)?.at(0);

	if (!topImportClause) return;

	const firstImports = topImportClause.leadingComments ?? [];

	topImportClause.leadingComments = [...leadingComments, ...firstImports];
};
