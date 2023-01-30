import { BsFillPersonFill } from "react-icons/bs";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import { BsFillPinMapFill } from "react-icons/bs";

export default function Result({ result }) {
  return (
    <div className="box">
      <h1 className="title pl-2">{result.family}</h1>
      <div className="columns is-mobile">
        <div className="column is-6">
          <div className="pl-2 columns is-mobile">
            <div className="column is-2">
              <BsFillPinMapFill />
            </div>
            <div className="column is-10">{result.address}</div>
          </div>
        </div>
      </div>

      {result.children.map((child) => (
        <div key={child} className="columns is-mobile pl-2">
          <div className="column is-6">
            <div className="columns is-mobile">
              <div className="column is-2">
                <BsFillPersonFill />
              </div>
              <div className="column is-10">{child.name}</div>
            </div>
          </div>
          <div className="column is-4">
            <div className="columns is-mobile">
              <div className="column is-2">
                <BsFillCalendar2WeekFill />
              </div>
              <div className="column is-10">{child.birthday}</div>
            </div>
          </div>
          <div className="column is-1">
            <div className="columns is-mobile">
              <div className="column is-2">
                <BsBook />
              </div>
              <div className="column is-10">
                {child.grade > 0 ? `${child.grade}` : "V"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
