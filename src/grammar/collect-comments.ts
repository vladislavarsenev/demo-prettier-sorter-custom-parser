export function collectComments(data: any) {
    if (data == null) return [];

    const isComment = data?.type === 'comment' || data?.type === 'ml_comment';

    if (isComment) {
        return [data?.text];
    }

    return data.flatMap(collectComments);
}
