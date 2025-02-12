type Data = [
    { text: string },
    unknown,
    unknown,
    string,
    { text: string },
    unknown,
];

export function collectNamedImport(data: Data) {
    return { name: data[0].text, alias: data[4]?.text };
}
