declare module 'react-event-listener' {
	type TReactEventListenerProps = {
		[onEvent: string]: Function | boolean | string | object | undefined,
		capture?: boolean,
		target: object | string
	};
	const ReactEventListener: React.ComponentClass<TReactEventListenerProps>;
	export default ReactEventListener;
}