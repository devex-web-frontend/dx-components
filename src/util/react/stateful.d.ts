type TStatefulOptions = {
	onChangeKey?: string,
	valueKey?: string,
	getValueFromOnChange: <T>(...args: any[]) => T
};

declare const stateful: (options?: TStatefulOptions) =>
	<TProps, TSource extends React.ComponentClass<TProps>>(target: TSource) => TSource;
export default stateful;
