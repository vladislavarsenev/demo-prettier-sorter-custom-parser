export type ImportItem = {
    leadingComments: string;
    traillingComments: string;
    defaultImport?: string;
    namespaceImport?: string;
    namedImports?: {
        alias: string | undefined;
        name: string;
        leadingComments: string[];
        trailingComments: string[];
    }[];
    from: string;
};

export type ExtractedImports = {
    startLoc: number;
    endLoc: number;
    imports: ImportItem[];
};
