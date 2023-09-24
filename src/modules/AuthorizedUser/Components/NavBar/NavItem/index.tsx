export interface INavItem {
	name: string,
	to: string
}

interface NavItemProps {
	item: INavItem
	clickHandler: (value: INavItem) => void
}

const NavItem = ({item, clickHandler}: NavItemProps) => {
	return <li className={"navbar-list__items"} onClick={() => clickHandler(item)}>{item.name}</li>
}

export default NavItem;