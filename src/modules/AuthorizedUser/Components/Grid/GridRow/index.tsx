import React from 'react';

interface GridRowProps {
	children: React.ReactElement[]
	clickHandler?: (id: number) => void,
	contextHandler?: (id: number, x: number, y: number) => void,
	objectId: number
}

const GridRow = ({children, clickHandler, objectId, contextHandler}: GridRowProps) => {
	return (
		<tr className={'grid-content__row'}
			data-obj-id={objectId}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();

				if (e.detail === 2) {
					clickHandler && clickHandler(objectId);
				}
			}}
			onContextMenu={(e) => {
				e.preventDefault();

				contextHandler && contextHandler(objectId, e.pageX, e.pageY);
			}}
		>
			{children}
		</tr>
	)
}

export default GridRow;