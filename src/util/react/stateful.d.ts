import {TControlProps, TStatefulControlProps} from '../../components/Control/Control';
type TStatefulOptions = {
	onChangeKey?: string,
	valueKey?: string,
	getValueFromOnChange?: <T>(...args: any[]) => T
};

export default function stateful(options?: TStatefulOptions): <TValue, TProps extends TControlProps<TValue>>(target: React.ComponentClass<TProps> | React.SFC<TProps>) => React.ComponentClass<TProps & TStatefulControlProps<TValue>>;