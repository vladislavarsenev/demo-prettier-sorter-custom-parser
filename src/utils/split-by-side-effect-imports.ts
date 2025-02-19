import { ImportItem } from '../types';
import { isSideEffectImport } from './is-side-effect-import';

interface Options {
	enabled: boolean;
}

export const splitBySideEffectImports = (
	imports: ImportItem[][],
	options: Options,
) => {
	if (!options.enabled) {
		return imports;
	}

	return imports
		.reduce<ImportItem[][]>((acc, cur) => {
			const groups = cur.reduce<ImportItem[][]>(
				(acc, cur) => {
					const lastItemInLastGroup: ImportItem | undefined = acc
						.at(-1)
						?.at(0);

					if (isSideEffectImport(cur)) {
						if (
							acc.at(-1)?.length !== 0 &&
							!isSideEffectImport(lastItemInLastGroup)
						) {
							acc.push([]);
						}

						acc.at(-1)?.push(cur);
						return acc;
					}

					if (isSideEffectImport(lastItemInLastGroup)) {
						acc.push([]);
					}

					acc.at(-1)?.push(cur);

					return acc;
				},
				[[]],
			);

			return [...acc, ...groups];
		}, [])
		.filter((group) => group.length > 0);
};
