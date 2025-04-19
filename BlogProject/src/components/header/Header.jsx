import React from "react";
import Container from "../container/Container";
import Logo from "../Logo";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/allposts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/addposts",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo className="w-[70px]"></Logo>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-50 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout></Logout>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
