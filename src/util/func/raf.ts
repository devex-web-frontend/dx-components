// @TODO remove after update dx-util 0.11.7 version or more. use /src/function/raf.ts instead dx-util
export const raf = <F extends Function>(cb: F): F & { cancel: () => void } => {
	let id: number | undefined;

	const invoke = (ctx: any, args: any[]) => () => {
		id = undefined;
		cb.apply(ctx, args);
	};

	//use function to save original context
	function synced(this: any, ...args: any[]) {
		if (typeof id === 'undefined') {
			id = requestAnimationFrame(invoke(this, args));
		}
	}

	synced['cancel'] = () => {
		if (id) {
			cancelAnimationFrame(id);
		}
	};

	return synced as any;
};