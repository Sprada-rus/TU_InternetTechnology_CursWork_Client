import {Suspense, useMemo, useState} from "react";
import {stringIndex} from "../../../../Interfaces";
import GridHead from "./GridHead";
import GridRow from "./GridRow";
import GridColumn from "./GridColumn";
import './grid.scss'
import GridContextMenu, {ContextMenuItemProps} from "./GridContextMenu";

interface GridProps {
	data: GridDataProps,
	name: string,
	doubleClickRowHandler?: (id: number) => void,
	hasContextMenu?: boolean
	contextMenuItem?: ContextMenuItemProps[]
}

export interface HeadItemProps {
	name: string,
	order: number
}

export interface GridDataProps {
	headers: stringIndex<HeadItemProps>,
	rows: stringIndex<any>[]
}

interface Position {
	x: number,
	y: number
}

const LoadingRow = () => {
	return <>
		<td className={'grid-content__column load-column'}></td>
		<td className={'grid-content__column load-column'}></td>
		<td className={'grid-content__column load-column'}></td>
	</>
}

const Grid = ({ data, name: tableName, doubleClickRowHandler, contextMenuItem }: GridProps) => {
	const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false);
	const [selectObjID, setSelectObjID] = useState<number>();
	const [position, setPosition] = useState<Position>({x: 0, y: 0});

	const columns: stringIndex<number> = useMemo(() => {
		const newColumns: stringIndex<number> = {}

		Object.entries(data.headers).forEach((headItem) => {
			newColumns[headItem[0]] = headItem[1].order;
		});

		return newColumns;
	}, [data.headers])

	const headGridData: [string, HeadItemProps][] = useMemo(() => {
		return Object.entries(data.headers).sort((a, b) => {
			const aValue = columns[a[0]];
			const bValue = columns[b[0]];

			return aValue - bValue;
		}) ;
	}, [data.headers, columns]);

	const bodyGridData = useMemo(() => {
		return data.rows.map((item) => Object.fromEntries(
			Object.entries(item).sort((a, b) => columns[a[0]] - columns[b[0]])
		))
	}, [data.rows, columns])

	return (
		<>
			<div className="grid-content">
				<table id={tableName} className={'grid-content__table'}>
					<thead>
					<tr>
						{headGridData.map((item) => {
							const [key, value] = item;
							return <GridHead key={key} name={key} label={value.name} sortHandler={(nameColumn) => {
								console.log('click head column', nameColumn)
							}}/>
						})}
					</tr>
					</thead>
					<tbody>
					<Suspense
						fallback={<LoadingRow/>}
					>
						{bodyGridData.map((item, rowNum) => {
								const objId = item.obj_id as number;
								return (
									<GridRow
										clickHandler={(id) => {
											doubleClickRowHandler && doubleClickRowHandler(id)
										}}
										contextHandler={(id, x, y) => {
											setSelectObjID(id);
											setIsOpenContextMenu(true);
											setPosition(() => ({x, y}));
											console.log(x, y)
										}}
										key={`${rowNum}_${tableName}_id_${objId}`}
										objectId={objId}
									>
										{Object.entries(item).map((itemProps) => {
											// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
											const keyColumn = itemProps[0], valueColumn: any = itemProps[1]
											// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
											return <GridColumn name={keyColumn} value={valueColumn ?? ''} key={keyColumn+objId}/>
										})}
									</GridRow>
								)
							}
						)}
					</Suspense>
					</tbody>
				</table>
			</div>
			{isOpenContextMenu && <GridContextMenu
				objId={selectObjID ?? 0}
				items={contextMenuItem ?? []}
				posX={position.x}
				posY={position.y}
				isOpen={isOpenContextMenu}
				onClose={() => {
					setIsOpenContextMenu(false);
				}}
			/>}
		</>
	)
}

export default Grid;