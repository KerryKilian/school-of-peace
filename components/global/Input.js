import React, { useState } from "react";
import classes from "./Input.module.css";

/**
 * Default input style for this website. If not a special input design wanted, use this design per default.
 * This component must be imported as {Input} in curly brackets
 * @author Kilian Aaron Brinkner
 * @param {*} className
 * @param type type
 * @param placeholder placeholder
 * @param ref ref
 * @param onChange onChange
 * @returns
 */
export const Input = React.forwardRef(
  // forwardRef used so that you can pass a ref into it
  ({ className = null, type, placeholder, onChange }, ref) => {
    const [inputValue, setInputValue] = useState("");

    // checks for dangerous letter which could lead to a hack (avoid cross site scripting)
    function checkInput(event) {
      let tempRef = event.target.value;
      let restricted = ["<", ">", "[", "]", "(", ")", "/", "'", '"', "{", "}"];
      for (let letter of restricted) {
        if (tempRef.includes(letter)) {
          tempRef = tempRef.replace(letter, "");
        }
        setInputValue(tempRef);
      }

      onChange;
    }
    return (
      <div className="">
        <input
          className={`${classes.customInput} ${className}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
          value={inputValue}
          onChange={checkInput}
        />
      </div>
    );
  }
);
