import { ImportItem } from '../type';
import { isNamespaceImport } from './is-namespace-import';

interface Options {
	enabled: boolean;
}

export const splitByNamespaceFactor = (
	imports: ImportItem[][],
	options: Options,
) => {
	const { enabled } = options;

	if (!enabled) {
		return imports;
	}

	return imports
		.reduce<ImportItem[][]>((acc, group) => {
			const groupsWithNamespaceFactor = group.reduce<
				[ImportItem[], ImportItem[]]
			>(
				(acc, cur) => {
					if (isNamespaceImport(cur)) {
						acc[0].push(cur);

						return acc;
					}

					acc[1].push(cur);

					return acc;
				},
				[[], []],
			);

			return [
				...acc,
				groupsWithNamespaceFactor[0],
				groupsWithNamespaceFactor[1],
			];
		}, [])
		.filter((el) => el.length !== 0);
};
