"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownIcon } from "@/icons";
import nav from "@/nav";
import classNames from "classnames";
import { useT } from "@/hooks";

const Nav = () => {
  const t = useT();

  const pathname = usePathname();

  const navConfig = nav(t);

  return (
    <>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <DropdownIcon className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navConfig.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.to!}
                    className={classNames("rounded", {
                      "bg-primary text-base-100": pathname === item.to,
                    })}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          Elin&apos;s Blog
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          {navConfig.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={item.to!}
                  className={classNames({
                    "bg-primary text-primary-content": pathname === item.to,
                  })}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Nav;
