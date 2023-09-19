interface NavItemProps {
	name: string
	to: string
	clickHandler: (value: string) => void
}

const NavItem = ({name, to, clickHandler}: NavItemProps) => {
	return <li className={"navbar-list__items"} onClick={() => clickHandler(to)}>{name}</li>
}

export default NavItem;