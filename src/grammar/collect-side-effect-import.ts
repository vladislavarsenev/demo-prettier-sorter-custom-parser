type Data = [unknown, unknown, string[], string, unknown, unknown, unknown];

export function collectSideEffectImport(data: Data) {
    const leadingComments = data[0] ?? [];

    return { leadingComments, from: data[3] };
}
