export const isThirdPartyLibrary = (importName: string) => {
	return !(importName.startsWith('.') || importName.startsWith('..'));
};
