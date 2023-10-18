import './GridContextMenu.scss';

interface GridContextMenuProps {
	objId: number,
	items: ContextMenuItemProps[],
	posX: number,
	posY: number,
	isOpen: boolean,
	onClose?: () => void,
	menuRef: React.MutableRefObject<HTMLDivElement | null>
}

export interface ContextMenuItemProps {
	name: string,
	label: string,
	actionHandler?: (id: number, typeAction: string) => void
}

const GridContextMenu = ({objId, items, posX, posY, isOpen, onClose, menuRef}: GridContextMenuProps) => {

	return <>
		{isOpen
			? <div className={'context-menu__wrapper'} onClick={onClose} onContextMenu={(e) => e.preventDefault()}>
				<div className="context-menu__list-item" style={{'--position-x': posX + 'px', '--position-y': posY + 'px'} as React.CSSProperties} ref={menuRef}>
					{items.map((item, index) => {
						return <p key={item.name + '_' + objId + '_' + index} onClick={() => item.actionHandler && item.actionHandler(objId, item.name)}>{item.label}</p>
					})}
				</div>
			</div>
			: <></>
		}
	</>
}

export default GridContextMenu;