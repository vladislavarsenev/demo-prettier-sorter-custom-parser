import { THIRD_PARTY_MODULES_SPECIAL_WORD } from '../constants';
import { ImportItem } from '../types';
import { isThirdPartyLibrary } from './is-third-party-library';

interface Options {
	sortOrder: string[];
	enabled: boolean;
}

export const splitByImportName = (
	imports: ImportItem[][],
	options: Options,
) => {
	const { enabled } = options;

	if (!enabled) {
		return imports;
	}

	const sortOrder = [...options.sortOrder];

	if (!sortOrder.includes(THIRD_PARTY_MODULES_SPECIAL_WORD)) {
		sortOrder.unshift(THIRD_PARTY_MODULES_SPECIAL_WORD);
	}

	const thirdPartyModulesIndex = sortOrder.findIndex(
		(item) => item === THIRD_PARTY_MODULES_SPECIAL_WORD,
	);

	return imports
		.reduce<ImportItem[][]>((acc, group) => {
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
		}, [])
		.filter((group) => group.length > 0);
};
