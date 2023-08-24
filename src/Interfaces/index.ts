import React from "react";

export interface IChildrenProp {
	children: string | React.ReactNode | React.ReactNode[]
	classes?: string
}

export type stringIndex <T extends keyof any> = {
	[P in string]: T
}

export type stateCallback <T> = (value: T) => void|T;