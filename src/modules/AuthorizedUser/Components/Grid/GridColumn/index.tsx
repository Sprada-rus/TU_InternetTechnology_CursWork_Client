interface GridColumnProps {
	name: string,
	value: any
}

const GridColumn = ({name, value}: GridColumnProps) => {
	return (
		<td className={`grid-content__column column-${name}`}>
			{value}
		</td>
	)
}

export default GridColumn;