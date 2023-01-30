import AddInputs from "../components/add/AddInputs";
import Header from "../components/header/Header";
import { hasCookie } from "cookies-next";
import { useEffect } from "react";
import Router from "next/router";

export default function Add() {
  // if password not written yet, user will be forced to go on login page
  if (hasCookie("password") == false) {
    useEffect(() => {
      const { pathname } = Router;
      if (pathname == "/add") {
        Router.push("/login");
      }
    });
  }
  return (
    <div>
      <Header />
      <div className="m-4">
        <AddInputs />
      </div>
    </div>
  );
}
