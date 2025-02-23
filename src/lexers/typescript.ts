import moo, { keywords } from 'moo';

export const getLexer = () =>
	moo.compile({
		directive: /^#![\/\w]+(?:\s[\w]+)?/,
		string: /(?:'.*?')|(?:".*?")|(?:`[^`]*`)/,
		ws: /[ \t]+/,
		nl: { match: /\r?\n/, lineBreaks: true },
		inlineComment: { match: /\/\/[^\n]*$/ },
		multiLineComment: { match: /\/\*[\s\S]*?\*\//, lineBreaks: true },
		identifier: {
			match: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
			type: keywords({
				kwImport: 'import',
				kwFrom: 'from',
				kwWith: 'with',
			}),
		},
		semicolon: ';',
		rbrace: '}',
		lbrace: '{',
		comma: ',',
		colon: ':',
		number: /[\d_]+/,
		otherChars: /[!\[\]\(\)=|\.+`<>/^&\?\@-]/,
	});
