import classes from "./InDevelopment.module.css";
import { BsConeStriped } from "react-icons/bs";

export default function InDevelopment() {
  return (
    <div className={`${classes.body}`}>
      <div className="column is-5"></div>
      <div className="column is-2">
        <div className="icon">
          <BsConeStriped size={28} />
        </div>
        <div className="text">
          <h1>Diese Seite ist in Entwicklung</h1>
        </div>
      </div>

      <div className="column is-5"></div>
    </div>
  );
}
