type TStatefulOptions = {
	onChangeKey?: string,
	valueKey?: string,
	getValueFromOnChange: <T>(...args: any[]) => T
};

declare const stateful: <TProps>(options?: TStatefulOptions) =>
	<TSource extends React.ComponentClass<TProps>>(target: TSource) => TSource;
export default stateful;
