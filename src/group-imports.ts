import { THIRD_PARTY_MODULES_SPECIAL_WORD } from './constants';
import { ImportItem } from './type';
import { isThirdPartyLibrary } from './utils/is-third-party-library';
import { splitBySideEffectImports } from './utils/split-by-side-effect-imports';

type Options = {
	importOrder?: string[];
	importOrderSideEffects?: boolean;
};

export const groupImports = (imports: ImportItem[], options: Options) => {
	const sortOrder = options.importOrder ?? [];

	if (!sortOrder.includes(THIRD_PARTY_MODULES_SPECIAL_WORD)) {
		sortOrder.unshift(THIRD_PARTY_MODULES_SPECIAL_WORD);
	}

	const thirdPartyModulesIndex = sortOrder.findIndex(
		(item) => item === THIRD_PARTY_MODULES_SPECIAL_WORD,
	);

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

					// add third party library wasn't matched with any sort order
					if (index === -1 && isThirdPartyLibrary(cur.from)) {
						acc.at(thirdPartyModulesIndex)?.push(cur);
						return acc;
					}

					acc.at(index)?.push(cur);

					return acc;
				},
				[...initial],
			);

			return [...acc, ...groupedBySortOrder];
		},
		[],
	);

	return groups.filter((group) => group.length > 0);
};
