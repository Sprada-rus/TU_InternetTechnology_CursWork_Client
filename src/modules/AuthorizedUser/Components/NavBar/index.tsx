import {Suspense, useState} from "react";
import {HiOutlineMenu} from "react-icons/hi";
import "./navbar.scss"
import {GrClose} from "react-icons/gr";
import useAppStore from "../../../../appStore.ts";
import NavItem from "./NavItem";

const LoadNavItems = () => {
    return <ul className={"navbar-list"}>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
        <li className={"navbar-list__items load"}></li>
    </ul>
}

interface INavItems {
    name: string,
    to: string
}

interface INavBar {
    navItems: INavItems[],
    chooseHandler: (chapter: string) => void
}

const NavBar = (props: INavBar) => {
    const [open, setOpen] = useState<boolean>(false);
    const {isMobile} = useAppStore();

    return <div className={"navbar"}>
        <button onClick={() => setOpen((prevState) => !prevState)} className={"btn-primary navbar__btn"}>
            <HiOutlineMenu/>
        </button>
        <nav className={"navbar__body" + (open ? ' open' : '') + (isMobile ? ' mobile' : '')}>
            {isMobile && <button className="mobile-close" onClick={() => setOpen(false)}>
                <GrClose/>
            </button>}
            <Suspense fallback={<LoadNavItems/>}>
                <ul className={"navbar-list"}>
                    {props.navItems.map((item, index) => (
                        <NavItem name={item.name} to={item.to} clickHandler={(chapter) => {
                            props.chooseHandler(chapter);
                            setOpen(false)
                        }} key={`${item.to}_${index}`}/>
                    ))}
                </ul>
            </Suspense>
        </nav>
    </div>
}

export default NavBar;