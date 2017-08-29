# 0.9.rc breaking changes
- some components drop default export in favor of named one
- some components dorp static propTypes property in favor of TS types
- some component will also use local `withTheme` enhancer with no support for statics hoist

- `IButtonProps` was replaced with `TButtonProps`
- `theme` was renamed to `withTheme`

## Combobox:
- remove `ANCHOR_THEME`, `ANCHOR_SHARE_PROP_TYPES`

## Selectbox/SelectboxAnchor
- default export changed to named

## BoundsUpdateDetector
- default export changed to named

## Pure
- default export changed to named

## Checkbox
- default export changed to named

## Highlight
- default export changed to named
- remove `HIGHLIGHT_THEME_SHAPE`

## Holdable
- default export changed to named

## Link
- default export changed to named
- Link now requires children

## ResizeDetector
- default export changed to named

## Expandable
- default export changed to named
- removed `EXPANDABLE_THEME`

## ExpandableHandler
- default export changed to named
- removed `EXPANDABLE_HANDLER_THEME`

## Menu
- ListComponent prop was replaced with List

## MenuItem
- ListItemComponent prop was replaced with ListItem

## MenuItemGroup
- ListItemGroupComponent props was replaced with ListItemGroup 
- ListComponent prop was with List

## Popover
- PLACEMENT was replaced with PopoverPlacement enum
- ALIGN was replaced with PopoverAlign enum

## SelectboxAnchor
- IconComponent prop was replaced with Icon

## Selectbox
- AnchorComponent prop was replaced with Anchor
- IconComponent prop was replaced with Icon
- MenuComponent prop was replaced with Menu
- PopoverComponent prop was replaced with Popover
- onChange event was replaced with onValueChange
- onValueChange does not pass `text` but only `value` as first arg

## Popup
- POPUP_THEME_SHAPE_OBJECT was removed
- children is required and is not checked in render

## ResizeDetector
- switch to element-resize-detector and scroll strategy instead of iframes
- onResize handler is now passed Element instead of Event

## LoadingIndication
- complete rewrite, refer to demo page