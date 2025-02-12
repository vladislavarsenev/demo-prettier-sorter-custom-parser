export type ImportItem = {
    leadingComments: string[];
    defaultImport?: string;
    namespaceImport?: string;
    namedImports?: {
        alias: string | undefined;
        name: string;
    }[];
    from: string;
};

export type ExtractedImports = {
    startLoc: number;
    endLoc: number;
    imports: ImportItem[];
};
