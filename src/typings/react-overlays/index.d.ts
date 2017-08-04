declare namespace ReactOverlays {
	namespace Portal {
		type TPortalProps = {
			container?: React.ReactNode | (() => React.ReactNode)
		};
	}
}

declare module 'react-overlays/lib/Portal' {
	import ComponentClass = React.ComponentClass;
	import TPortalProps = ReactOverlays.Portal.TPortalProps;

	const Portal: ComponentClass<TPortalProps>;
	export = Portal;
}

declare module 'react-overlays/lib/RootCloseWrapper' {
	type TRootCloseWrapperProps = {
		onRootClose?: Function,
		children: React.ReactElement<any>,
		disabled?: boolean,
		event?: 'click' | 'mousedown'
	};
	const ReactCloseWrapper: React.ComponentClass<TRootCloseWrapperProps>;
	export  = ReactCloseWrapper;
}