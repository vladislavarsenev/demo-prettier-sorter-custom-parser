type Data = [unknown, unknown, unknown, string, unknown, unknown, unknown];

export function collectSideEffectImport(data: Data) {
    return { from: data[3] };
}
