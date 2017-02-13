type TStatefulOptions = {
	onChangeKey?: string,
	valueKey?: string,
	getValueFromOnChange: <T>(...args: any[]) => T
};

export default function stateful(options?: TStatefulOptions): <T>(target: T) => T;