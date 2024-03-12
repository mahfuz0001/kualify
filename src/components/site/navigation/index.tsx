"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

import { ModeToggle } from "@/components/global/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="  w-full">
      <FloatingNav navItems={navItems} />
      {/* <DummyContent /> */}
    </div>
    // <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
    //   {/* Logo */}
    //   <aside className="flex items-center gap-2">
    //     <Image
    //       src={"/assets/kualify-logo-dark.png"}
    //       width={120}
    //       height={50}
    //       alt="kualify logo"
    //     />
    //   </aside>
    //   {/* Navigation */}
    //   <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
    //     <ul className="flex items-center justify-center gap-8">
    //       <Link href={"#"}>Pricing</Link>
    //       <Link href={"#"}>About</Link>
    //       <Link href={"#"}>Documentation</Link>
    //       <Link href={"#"}>Features</Link>
    //     </ul>
    //   </nav>
    //   <aside className="flex gap-2 items-center">
    //     <Link
    //       href={"/agency"}
    //       className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
    //     >
    //       Login
    //     </Link>
    //     <UserButton />
    //     <ModeToggle />
    //   </aside>
    // </div>
  );
};

export default Navigation;

const DummyContent = () => {
  return (
    <div className="grid grid-cols-1 h-[40rem] w-full bg-white dark:bg- relative border border-neutral-200 dark:border-white/[0.2] rounded-md">
      {/* <p className="dark:text-white text-neutral-600 text-center text-4xl mt-40 font-bold">
        Scroll back up to reveal Navbar
      </p> */}
      <div className="inset-0 absolute bg-grid-black/[0.1] dark:bg-grid-white/[0.2]" />
    </div>
  );
};

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
