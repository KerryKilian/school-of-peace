import classes from "./Calendar.module.css";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillPersonXFill } from "react-icons/bs";

/**
 * A component in the day comp. which shows every person which is either coming or not
 * @param {*} param0
 * @returns
 */
export default function Person({ person }) {
  return (
    <div className={`${classes.person}`}>
      <div>
        {person.coming ? (
          <div className={`${classes.icon}`}>
            <BsFillPersonCheckFill color="green" />
          </div>
        ) : (
          <div className={`${classes.icon}`}>
            <BsFillPersonXFill color="red" />
          </div>
        )}
      </div>
      {person.name}
    </div>
  );
}
