"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "@/data/Sidebar/menu";

interface Props {
  menus: SidebarMenu[];
}

const Sidebar: React.FC<Props> = ({ menus }) => {
  
  const location = usePathname();

  const isActive = (link: string) => {
    if (link === "/") return location === "/";
    return location.startsWith(link);
  };

  return (
    <aside className="lg:w-[200px] xl:w-[240px] 2xl:w-[260px] fixed inset-y-0 left-0 z-10 h-screen bg-[#ecebeb]">
      <div className="flex items-center justify-center lg:h-[4.5rem] 2xl:h-[5rem]">
        <Link href="/dashboard">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={51}
            className="lg:w-[165px] xl:w-[200px]"
          />
        </Link>
      </div>
      <nav className="pl-4 relative py-6 space-y-5 2xl:space-y-6 overflow-y-auto overflow-x-hidden scrollbar-hide h-[calc(100vh-67px)]">
        {menus.map((sidebarMenu, index) => {
          const nonLogoutItems = sidebarMenu.menuItems.filter(
            (item) => item.id !== "logout"
          );
          const logoutItem = sidebarMenu.menuItems.find(
            (item) => item.id === "logout"
          );
          return (
            <div key={index} className="h-full relative">
              <ul className="space-y-4">
                {nonLogoutItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link || ""}
                      className={`flex items-center gap-3 p-2 text-sm font-bold 3xl:text-base capitalize rounded-tl-full rounded-bl-full rounded-tr-2xl rounded-br-2xl hover:bg-blue hover:text-text-[#222222] transition-colors duration-300 ${
                        isActive(item.link || "")
                          ? "bg-[#001B48] text-white pl-3"
                          : "text-[#222222]"
                      }`}
                    >
                      {item.icon && (
                        <span>
                          <item.icon />
                        </span>
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {logoutItem && (
                <div className="absolute bottom-6 w-full pr-4">
                  <Link
                    href={logoutItem.link || ""}
                    className={`flex items-center gap-3 p-2 text-sm font-bold 3xl:text-base capitalize rounded-tl-full rounded-bl-full rounded-tr-2xl rounded-br-2xl hover:bg-blue hover:text-text-[#222222] transition-colors duration-300 ${
                      isActive(logoutItem.link || "")
                        ? "bg-[#001B48] text-white pl-3"
                        : "text-[#222222]"
                    }`}
                  >
                    {logoutItem.icon && (
                      <span>
                        <logoutItem.icon />
                      </span>
                    )}
                    <span>{logoutItem.title}</span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;