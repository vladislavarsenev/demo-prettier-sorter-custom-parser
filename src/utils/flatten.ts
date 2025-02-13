type FlattenArray<T extends readonly unknown[]> = T extends readonly (infer U)[]
	? U extends readonly unknown[]
		? FlattenArray<U>
		: U
	: never;

export const flatten = <T>(arr: T[]): FlattenArray<T[]>[] => {
	return arr.reduce<FlattenArray<T[]>[]>((acc, cur) => {
		if (Array.isArray(cur)) {
			return [...acc, ...flatten(cur)];
		}

		return [...acc, cur];
	}, []);
};
