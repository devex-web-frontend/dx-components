import React from 'react';
import Emitter from 'dx-util/lib/emitter/Emitter';

export const EVENT_SCROLABLE = {
	RESIZE: 'EVENT_SCROLABLE:RESIZE',
	SCROLL: 'EVENT_SCROLLABLE:SROLL',
	SCROLLBAR_UPDATE: 'EVENT_SCROLABLE:SCROLLBAR_UPDATE'
};

export class ScrollableInternalEmitter extends Emitter {
	emit(event, ...args) {
		this._emit(event, ...args);
	}
}

export const SCROLLABLE_CONTEXT_EMITTER = '__SCROLLABLE__CONTEXT_EMITTER__';
export const CONTEXT_TYPES = {
	[SCROLLABLE_CONTEXT_EMITTER]: React.PropTypes.instanceOf(ScrollableInternalEmitter).isRequired,
	size: React.PropTypes.shape({
		width: React.PropTypes.number,
		height: React.PropTypes.height
	})
};