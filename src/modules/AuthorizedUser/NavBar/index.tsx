import {Suspense, useState} from "react";
import {HiOutlineMenu} from "react-icons/hi";
import "./navbar.scss"
import {GrClose} from "react-icons/gr";
import useAppStore from "../../../appStore.ts";

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
                        <li className={"navbar-list__items"} key={item.to + index}>{item.name}</li>
                    ))}
                </ul>
            </Suspense>
        </nav>
    </div>
}

export default NavBar;