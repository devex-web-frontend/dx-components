#0.9.rc breaking changes
- some components drop default export in favor of named one
- some components dorp static propTypes property in favor of TS types
- some component will also use local `withTheme` enhancer with no support for statics hoist

- `IButtonProps` was replaced with `TButtonProps`
- `theme` was renamed to `withTheme`