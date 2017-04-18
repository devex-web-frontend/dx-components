declare module 'react-overlays/lib/Portal' {
	import ReactNode = React.ReactNode;
	import ComponentClass = React.ComponentClass;
	type TPortalProps = {
		container?: ReactNode
	};
	const Portal: ComponentClass<TPortalProps>;
	export = Portal;
}