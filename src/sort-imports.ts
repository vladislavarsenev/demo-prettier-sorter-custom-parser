import { ImportItem } from './type';

type Options = {
    importOrderCaseInsensitive?: boolean;
};

export const sortImports = (imports: ImportItem[], options: Options = {}) => {
    const importOrderCaseInsensitive =
        options.importOrderCaseInsensitive ?? false;

    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'accent',
        caseFirst: importOrderCaseInsensitive ? 'upper' : 'false',
    });

    return imports.sort((a, b) => {
        return collator.compare(a.from, b.from);
    });
};
