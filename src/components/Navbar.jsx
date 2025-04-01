import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-white"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png" style={{ width: "120px", height: "70px", objectFit: "cover", marginRight: "20px" }}  alt="" /></span>
				</Link>
			</div>
		</nav>
	);
};