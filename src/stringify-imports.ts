import {
    GROUP_SEPARATOR,
    IMPORT_SEPARATOR,
    NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD,
} from './constants';
import { GroupedImportItem, ImportItem } from './types';

const fixPreface = (
    preface: string | undefined,
    importOrderSeparation: boolean,
) => {
    if (importOrderSeparation) {
        const trimmedPreface = preface?.trimRight();
        if (trimmedPreface && trimmedPreface.length > 0) {
            return trimmedPreface + '\n';
        }

        return '';
    }

    return preface;
};

const fixGluedImports = (
    importString: string,
    index: number,
    array: string[],
) => {
    const isTroubleEnding = !['\n', '\r\n', ';'].some((separator) =>
        importString.endsWith(separator),
    );

    if (isTroubleEnding && index < array.length - 1) {
        return `${importString};`;
    }

    return importString;
};

const replaceNamedImportsPlaceholder = (
    text: string,
    namedImportsRendered: string,
) => {
    return text.replace(
        NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD,
        namedImportsRendered,
    );
};

const renderNamedImports = (item: ImportItem) => {
    const namedImports = item.namedImports;

    if (!namedImports) return '';

    return namedImports?.reduce((acc, cur, index) => {
        const { text } = cur;

        if (index === 0) return text;

        return `${acc}, ${text}`;
    }, '');
};

type Options = {
    importOrderSeparation?: boolean;
};

export const stringifyImports = (
    groupedImports: GroupedImportItem[],
    options?: Options,
) => {
    const { importOrderSeparation = false } = options ?? {};

    const groups = groupedImports.map((el) => {
        const imports = el
            .map((item, index, originalArray) => {
                let text = item.text;

                if (importOrderSeparation && index < originalArray.length - 1) {
                    text = text.trimRight() + '\n';
                }

                let prefaceText = fixPreface(
                    item.prefaceText,
                    importOrderSeparation,
                );

                const renderedNamedImports = replaceNamedImportsPlaceholder(
                    text,
                    renderNamedImports(item),
                );

                const preface = prefaceText ?? '';

                return `${preface}${renderedNamedImports}`;
            })
            .map(fixGluedImports);

        return imports.join(IMPORT_SEPARATOR);
    });

    return groups.join(
        options?.importOrderSeparation ? GROUP_SEPARATOR : IMPORT_SEPARATOR,
    );
};
