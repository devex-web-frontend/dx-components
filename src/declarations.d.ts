declare module '*.svg' {
	const name: string;
	export = name;
}

declare module '*.styl' {
	const theme: {
		[key: string]: string
	};
	export = name;
}