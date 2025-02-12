import { addLeadingComments } from './add-leading-comments';

type Data = [
    unknown,
    unknown,
    string[],
    { defaultImport: string; namespaceImport: string; namedImports: string[] },
    string[],
    unknown,
    unknown,
    unknown,
    string,
];

export function collectDefaultImportStatement(data: Data) {
    const leadingComments = data[0] ?? [];
    const importSubjectLeadingComments = data[2] ?? [];
    const importSubjectTrailingComments = data[4] ?? [];

    const comments = {
        leadingComments: importSubjectLeadingComments,
        trailingComments: importSubjectTrailingComments,
    };

    return {
        leadingComments,
        defaultImport: addLeadingComments(data[3].defaultImport, comments),
        namespaceImport: addLeadingComments(data[3].namespaceImport, comments),
        namedImports: data[3].namedImports,
        from: data[7],
    };
}
