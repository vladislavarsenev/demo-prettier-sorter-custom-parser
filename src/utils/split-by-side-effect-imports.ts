import { ImportItem } from '../type';
import { isSideEffectImport } from './is-side-effect-import';

export const splitBySideEffectImports = (imports: ImportItem[]) => {
	return imports.reduce<ImportItem[][]>(
		(acc, cur) => {
			if (isSideEffectImport(cur)) {
				if (acc.at(-1)?.length !== 0) acc.push([]);
				acc.at(-1)?.push(cur);
				return acc;
			}

			const lastItemInLastGroup: ImportItem | undefined = acc
				.at(-1)
				?.at(0);

			if (isSideEffectImport(lastItemInLastGroup)) {
				acc.push([]);
			}

			acc.at(-1)?.push(cur);

			return acc;
		},
		[[]],
	);
};
