import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../Toogle";
import { useRouter } from "next/router";
import { UserDataContext } from "@/context/useContext";

const NavBar = () => {
  const router = useRouter();

  const { userData } = useContext(UserDataContext);

  const logOut = () => {
    localStorage.removeItem("userData");
    router.push("/login");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "60px",
          backgroundColor: "#eeeeee",
        }}
        className="navBar"
      >
        <ModeToggle />

        <Link href="/newTask" className="flex justify-center px-5 py-10">
          <Button>Create New Tasks</Button>
        </Link>
        {/* <Link href="/allTasks">
          <Button>All tasks</Button>
        </Link> */}
        {userData && (
          <Button onClick={logOut} className="hover:bg-red-600">
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default NavBar;
