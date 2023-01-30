import Header from "../components/header/Header";
import InDevelopment from "../components/inDevlopment/InDevelopment";
import { hasCookie } from "cookies-next";
import { useEffect } from "react";
import Router from "next/router";

export default function Edit() {
  // if password not written yet, user will be forced to go on login page
  if (hasCookie("password") == false) {
    useEffect(() => {
      const { pathname } = Router;
      if (pathname == "/edit") {
        Router.push("/login");
      }
    });
  }
  return (
    <div>
      <Header />

      <InDevelopment />
    </div>
  );
}
