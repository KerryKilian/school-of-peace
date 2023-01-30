import Header from "../components/header/Header";
import Search from "../components/get/Search";
import { hasCookie } from "cookies-next";
import Router from "next/router";
import { useEffect } from "react";
var CryptoJS = require("crypto-js");

export default function Home({ data }) {
  // if password not written yet, user will be forced to go on login page
  if (hasCookie("password") == false) {
    useEffect(() => {
      const { pathname } = Router;
      if (pathname == "/") {
        Router.push("/login");
      }
    });
  }

  return (
    <div>
      <Header />
      <Search data={data} />
    </div>
  );
}

export async function getStaticProps(context) {
  // if password not written yet, user will be forced to go on login page
  // if (hasCookie("password") == false) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  // check if dev or production server -> fetch the proper server address
  const dev = process.env.NODE_ENV !== "production";
  const server = dev
    ? "http://localhost:3000"
    : "https://your_deployment.server.com";

  // HIER !!!! *******************************************************************************************
  const response = await fetch(`http://localhost:3000/api/getAll`);
  // const response = await fetch(`http://localhost:3000/api/data`);
  let data = await response.json();
  // const data = JSON.stringify(response);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
