import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="">
            <nav className="d-flex justify-content-between pt-2">
                <span>
                    <Link to="/">logo</Link>
                </span>
                <ul className="">
                    <li className="">
                        <Link href="">Prisijungti</Link>
                    </li>
                    {/* <li>
                        <Link href="">Dashboard</Link>
                    </li> */}
                    {/* <li>
                        <button>Atsijungti</button>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
