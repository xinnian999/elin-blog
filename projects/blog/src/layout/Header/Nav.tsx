"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownIcon } from "@/components";
import { useTranslations } from "next-intl";
import nav from "@/nav";
import classNames from "classnames";

const Nav = () => {
  const t = useTranslations("Nav");

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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navConfig.map((item, index) => {
              // if (item.children) {
              //   return (
              //     <li key={item.label}>
              //       <a>{item.label}</a>
              //       <ul className="p-2">
              //         {item.children.map((v) => (
              //           <li key={v.label}>
              //             <a>{v.label}</a>
              //           </li>
              //         ))}
              //       </ul>
              //     </li>
              //   );
              // }
              return (
                <Link
                  key={index}
                  href={item.to!}
                  className={classNames('rounded',{
                    "bg-primary text-base-100": pathname === item.to,
                  })}
                >
                  <li>
                    <a>{item.label}</a>
                  </li>
                </Link>
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
            // if (item.children) {
            //   return (
            //     <li
            //       key={item.label}
            //       className={classNames({
            //         "font-bold": item.children.some((v) => v.to === pathname),
            //       })}
            //     >
            //       <details>
            //         <summary>{item.label}</summary>
            //         <ul className="p-2 flex flex-col gap-2">
            //           {item.children.map((v) => (
            //             <li key={v.label} className="whitespace-nowrap">
            //               <Link
            //                 href={v.to!}
            //                 className={
            //                   pathname === v.to
            //                     ? "active whitespace-nowrap"
            //                     : "whitespace-nowrap"
            //                 }
            //               >
            //                 {v.label}
            //               </Link>
            //             </li>
            //           ))}
            //         </ul>
            //       </details>
            //     </li>
            //   );
            // }
            return (
              <li key={index}>
                <Link
                  href={item.to!}
                  className={classNames({
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
    </>
  );
};

export default Nav;
