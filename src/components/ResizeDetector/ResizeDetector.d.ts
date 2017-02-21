declare type TResizeDetectorProps = {
	theme?: {
		container?: string
	},
	onResize: (event: UIEvent) => any;
};
declare const ResizeDetector: React.ComponentClass<TResizeDetectorProps>;
export default ResizeDetector;