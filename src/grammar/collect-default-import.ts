type Data = [{ text: string }, unknown, unknown, unknown, unknown, unknown];

export function collectDefaultImport(data: Data) {
    return data[0].text;
}
