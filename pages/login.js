import Router from "next/router";
import { useRef, useState, useEffect } from "react";
import Button from "../components/global/Button";
import { Input } from "../components/global/Input";
import PasswordMessage from "../components/global/Message";
const { createHash } = require("crypto");
import { setCookie, hasCookie } from "cookies-next";
var CryptoJS = require("crypto-js");

export default function login() {
  // const router = useRouter();
  const loginRef = useRef();
  const [passwordState, setPasswordState] = useState();

  // if password authentication already passed, redirect to home page
  if (passwordState == null) {
    if (hasCookie("password") == true) {
      console.log("password already written");
      useEffect(() => {
        const { pathname } = Router;
        if (pathname == "/login") {
          Router.push("/");
        }
      });
    }
  }

  async function loginHandler() {
    const enteredPassword = loginRef.current.value;

    // send hashed password to /api/login
    const hashedPw = createHash("sha256").update(enteredPassword).digest("hex");

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(hashedPw, hashedPw).toString();

    // console.log(JSON.stringify({ body: ciphertext }));
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ body: ciphertext }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // get and decrypt data
    let data = await response.json();
    let bytes = CryptoJS.AES.decrypt(data.body, hashedPw);
    data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // check if server authorized login or not
    if (data.isCorrect === true) {
      setCookie("password", "true");
      setPasswordState(true);
      await timeout(1000);
      const { pathname } = Router;
      if (pathname == "/login") {
        Router.push("/");
      }
    } else {
      setPasswordState(false);
    }
  }

  // wait 1 second to show the user that he typed correctly
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  return (
    <div className="columns is-mobile is-centered" data-testid="login-page">
      <div className="column is-6-desktop is-11-mobile is-11-tablet mt-6">
        <h1 className="title has-text-black">Login</h1>
        <p className="has-text-black m-2">
          Logge dich ein, um auf diese Daten zugreifen zu können
        </p>
        <div className="is-flex">
          <Input
            className=""
            type="text"
            placeholder="Passwort"
            ref={loginRef}
          />
          <div className="ml-2">
            <Button
              className=""
              onClick={() => loginHandler()}
              text="Bestätigen"
            >
              Bestätigen
            </Button>
          </div>
        </div>
        {passwordState == true ? (
          <PasswordMessage isCorrect={true} message={"Richtiges Passwort"} />
        ) : passwordState == false ? (
          <PasswordMessage isCorrect={false} message={"Falsches Passwort"} />
        ) : null}
      </div>
    </div>
  );
}
