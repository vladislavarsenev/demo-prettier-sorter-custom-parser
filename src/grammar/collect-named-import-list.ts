type Data = ({ alias: string } | Array<{ alias: string }>)[];

type Return = { alias: string }[];

export function collectNamedImportList(data: Data): Return {
    return data.flatMap((item) => {
        if (!Array.isArray(item) && !('alias' in (item ?? {}))) return [];

        return Array.isArray(item) ? collectNamedImportList(item) : item;
    });
}
