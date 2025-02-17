import moo from 'moo';

export const lexer = moo.compile({
	comment: /\/\/.*?$/,
	ml_comment: /\/\*[\s\S]*?\*\//,
	wschar: /[ \t\r]+/,
	lbrace: '{',
	rbrace: '}',
	semicolon: ';',
	colon: ':',
	comma: ',',
	from: 'from',
	single_quote: "'",
	double_quote: '"',
	importLit: 'import',
	withLiteral: 'with',
	assertLiteral: 'assert',
	as: 'as',
	asterix: '*',
	string: /[\.\/a-zA-Z0-9@_]+(?<!\/)/,
	newline: { match: /\n/, lineBreaks: true },
});
