import { GroupedImportItem, ImportItem } from './types';

export const moveCommentFromImportTo = (
	groupedImports: GroupedImportItem[],
	fromImport: ImportItem,
) => {
	const prefaceTargetImport = fromImport.prefaceText ?? '';

	fromImport.prefaceText = '';

	const topImportClause = groupedImports.at(0)?.at(0);

	if (!topImportClause) return;

	const firstImportPreface = topImportClause.prefaceText ?? '';

	topImportClause.prefaceText = `${prefaceTargetImport}${firstImportPreface}`;
};
