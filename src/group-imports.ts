import { ImportItem } from './type';
import { splitBySideEffectImports } from './utils/split-by-side-effect-imports';

type Options = {
	importOrder?: string[];
	importOrderSideEffects?: boolean;
};

export const groupImports = (imports: ImportItem[], options: Options) => {
	const sortOrder = options.importOrder ?? [];
	const importOrderSideEffects = options.importOrderSideEffects ?? true;

	const groupsWithSideEffects = importOrderSideEffects
		? [imports]
		: splitBySideEffectImports(imports);

	const groups = groupsWithSideEffects.reduce<ImportItem[][]>(
		(acc, group) => {
			const initial = Array.from(
				{ length: sortOrder.length + 1 },
				() => [],
			);

			const groupedBySortOrder = group.reduce<ImportItem[][]>(
				(acc, cur) => {
					const index = sortOrder.findIndex((item) =>
						new RegExp(item).test(cur.from),
					);
					acc.at(index)?.push(cur);

					return acc;
				},
				[...initial],
			);

			if (groupedBySortOrder.at(-1)?.length === 0) {
				groupedBySortOrder.pop();
			}

			return [...acc, ...groupedBySortOrder];
		},
		[],
	);

	return groups;
};
