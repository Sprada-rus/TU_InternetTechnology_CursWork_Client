interface GridHeadProps {
	name: string,
	label: string,
	sortHandler: (nameColumn: string) => void
}

const GridHead = ({name, label, sortHandler}: GridHeadProps) => {
	return (
		<th className={'grid-content__head-column'} onClick={() => sortHandler(name)}>
			{label}
		</th>
	)
}

export default GridHead;