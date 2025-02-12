export function addLeadingComments(
    str: String,
    arg: { trailingComments: string[]; leadingComments: string[] },
) {
    const trailingCommentsStr = arg.trailingComments.join('');
    const leadingCommentsStr = arg.leadingComments.join('');

    return str ? `${leadingCommentsStr}${str}${trailingCommentsStr}` : str;
}
