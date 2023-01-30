import classes from "./Button.module.css";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonXFill } from "react-icons/bs";

/**
 * Default button style for this website. If not a special button design wanted, use this design per default
 * @author Kilian Aaron Brinkner
 * @param {*} className className
 * @param onClick onClick
 * @param text text
 * @returns
 */
export default function Button({ className, onClick, text }) {
  let isLight = className;
  return (
    <div className="">
      <button
        className={`${classes.customButton} ${isLight ? classes.light : null} ${
          text.length < 2 ? classes.squareBtn : null
        } `}
        onClick={onClick}
      >
        {text == "+" ? <BsFillPersonPlusFill /> : null}
        {text == "-" ? <BsFillPersonXFill /> : null}
        {text != "+" && text != "-" ? text : null}
      </button>
    </div>
  );
}
