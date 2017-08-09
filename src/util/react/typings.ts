import { Component } from 'react';

export type ReactRef<P = any> = Component<P> | Element | null;

export type WithInnerRef<P> = P & {
	innerRef: (instance: ReactRef) => void
};