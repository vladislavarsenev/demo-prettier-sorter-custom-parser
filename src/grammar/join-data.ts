type JoinData = string[] | JoinData[];

export const joinData = (data: JoinData): string => {
	return data.reduce<string>((acc, el) => {
		if (Array.isArray(el) && el.length === 0) return acc;
		if (Array.isArray(el)) {
			return acc + joinData(el);
		}

		return acc + el;
	}, '');
};
