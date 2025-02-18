import { GROUP_SEPARATOR, IMPORT_SEPARATOR } from './constants';
import { GroupedImportItem, ImportItem } from './types';
import { isSideEffectImport } from './utils/is-side-effect-import';

const unshiftLeadingComments = (comments: string[], importString: string) => {
	return `${comments.join('\n')}\n${importString}`;
};

const renderSideEffectImport = (importItem: ImportItem) => {
	return `import "${importItem.from}"`;
};

const renderNamespaceImport = (importItem: ImportItem) => {
	return `import * as ${importItem.namespaceImport} from "${importItem.from}"`;
};

const renderNamedImport = (specifier: { name: string; alias?: string }) => {
	if (specifier.alias) {
		return `${specifier.name} as ${specifier.alias}`;
	}

	return specifier.name;
};

const renderNamedImports = (importItem: ImportItem) => {
	if (!importItem.namedImports || importItem.namedImports.length === 0) {
		return '';
	}

	return `{ ${importItem.namedImports?.map(renderNamedImport).join(', ')} }`;
};

const renderDefaultImport = (importItem: ImportItem) => {
	const defaultImportString = importItem.defaultImport ?? '';
	const namedImportsString = renderNamedImports(importItem);
	const separator = defaultImportString && namedImportsString ? ', ' : '';

	return `import ${defaultImportString}${separator}${namedImportsString} from "${importItem.from}"`;
};

const renderImportAttributes = (importItem: ImportItem) => {
	return ` ${importItem.importAttributes}`;
};

const renderImportItem = (importItem: ImportItem) => {
	let importString = '';

	if (isSideEffectImport(importItem)) {
		importString = renderSideEffectImport(importItem);
	} else if (importItem.namespaceImport) {
		importString = renderNamespaceImport(importItem);
	} else if (importItem.defaultImport || importItem.namedImports) {
		importString = renderDefaultImport(importItem);
	}

	if (importItem.leadingComments?.length) {
		importString = unshiftLeadingComments(
			importItem.leadingComments,
			importString,
		);
	}

	if (importItem.importAttributes) {
		importString += renderImportAttributes(importItem);
	}

	return importString;
};

type Options = {
	importOrderSeparation?: boolean;
};

export const stringifyImports = (
	groupedImports: GroupedImportItem[],
	options?: Options,
) => {
	const groups = groupedImports.map((el) => {
		const imports = el.map(renderImportItem);
		return imports.join(IMPORT_SEPARATOR);
	});

	return groups.join(
		options?.importOrderSeparation ? GROUP_SEPARATOR : IMPORT_SEPARATOR,
	);
};
