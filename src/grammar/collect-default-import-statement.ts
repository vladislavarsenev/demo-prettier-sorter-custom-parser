import { ExtractedImports, ImportItem } from '../type';
import { addLeadingComments } from './add-leading-comments';

type Data = [
	unknown,
	unknown,
	string[],
	{
		defaultImport: string;
		namespaceImport: string;
		namedImports: {
			alias: string | undefined;
			name: string;
		}[];
	},
	string[],
	unknown,
	unknown,
	unknown,
	string,
	unknown,
	string,
];

export function collectDefaultImportStatement(data: Data) {
	const leadingComments = (data[0] ?? []) as string[];
	const importSubjectLeadingComments = data[2] ?? [];
	const importSubjectTrailingComments = data[4] ?? [];

	const comments = {
		leadingComments: importSubjectLeadingComments,
		trailingComments: importSubjectTrailingComments,
	};

	const output: ImportItem = {
		leadingComments,
		defaultImport: addLeadingComments(data[3].defaultImport, comments),
		namespaceImport: addLeadingComments(data[3].namespaceImport, comments),
		namedImports: data[3].namedImports,
		from: data[7] as string,
	};

	if (data[9]) {
		output.importAttributes = data[9] as string;
	}

	return output;
}
