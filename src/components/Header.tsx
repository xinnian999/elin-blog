const menus = [
  {
    label: "Home",
  },
  {
    label: "Resource",
    children: [
      {
        label: "Project1",
      },
      {
        label: "Project1",
      },
    ],
  },
  {
    label: "Friends",
  },
  {
    label: "About",
  },
];

const Header = () => {
  return (
    <header>
      <div className="navbar bg-base-100 fixed shadow-[0_2px_2px_0px_rgba(0,0,0,0.1)]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li> */}

              {menus.map((item, index) => {
                if (item.children) {
                  return (
                    <li key={item.label}>
                      <a>{item.label}</a>
                      <ul className="p-2">
                        {item.children.map((v) => (
                          <li key={v.label}>
                            <a>{v.label}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <a>{item.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Elin&apos;s Blog</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
