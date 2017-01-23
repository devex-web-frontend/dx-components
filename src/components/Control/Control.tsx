export interface IControlProps<TValue> {
	value?: TValue,
	defaultValue?: TValue,
	onChange?: (value: TValue) => void
}