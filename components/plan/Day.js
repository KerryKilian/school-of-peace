import classes from "./Calendar.module.css";
import { Input } from "../global/Input";
import Person from "./Person";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BsFillPersonXFill } from "react-icons/bs";
import Button from "../global/Button";
import { useRef, useState } from "react";
import PasswordMessage from "../global/Message";

/**
 * Creates new Day box in Calendar. Should show the next sunday first
 * @author Kilian Aaron Brinkner
 * @param {*} date next sunday date as string
 * @param data fetched data from plan.js page but only one data from next sunday
 * @returns
 */
export default function Day({ date, data }) {
  const confirmPlan = useRef();
  const [btnTrueState, setBtnTrueState] = useState(true);
  const [btnFalseState, setBtnFalseState] = useState(false);
  const [coming, setComing] = useState(true);
  const [responseDiv, setResponseDiv] = useState(null);

  // updates plan data with a new name
  async function addPlanHandler() {
    // avoid cross site scripting
    var stripTagsRE = /<\/?[^>]+>[=(]->/gi;
    let confirmPlanValue = confirmPlan.current.value.replace(stripTagsRE, "");

    const arrivingPeople = [
      ...data.people,
      { name: confirmPlanValue, coming: coming },
    ];
    data.people = arrivingPeople;
    console.log(data);

    const response = await fetch("/api/plan/update", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 201) {
      setResponseDiv(
        <div>
          <PasswordMessage
            isCorrect={true}
            message={"Dein Name wurde erfolgreich eingefügt."}
          />
        </div>
      );
    } else {
      setResponseDiv(
        <div>
          <PasswordMessage
            isCorrect={false}
            message={"Etwas ist schief gelaufen. Aktualisiere die Webseite."}
          />
        </div>
      );
    }
  }

  function btnTrue() {
    setBtnTrueState(true);
    setBtnFalseState(false);
    setComing(true);
  }

  function btnFalse() {
    setBtnFalseState(true);
    setBtnTrueState(false);
    setComing(false);
  }

  return (
    <div className={`${classes.day} box`}>
      <p className={`${classes.title}`}>{date}</p>
      {data.people.map((person) => {
        return <Person person={person} key={person.name} />;
      })}
      <div className={`${classes.ownPlan}`}>
        <div>
          <button
            className={`${classes.chooseBtn}`}
            onClick={btnTrue}
            id="btnTrue"
          >
            <BsFillPersonCheckFill
              color={btnTrueState ? "green" : "grey"}
              size={20}
            />
          </button>
        </div>
        <div>
          <button
            className={`${classes.chooseBtn}`}
            onClick={btnFalse}
            id="btnFalse"
          >
            <BsFillPersonXFill
              color={btnFalseState ? "red" : "grey"}
              size={20}
            />
          </button>
        </div>
        <div className={`${classes.myName}`}>
          <Input placeholder="Mein Name" ref={confirmPlan} />
        </div>
        <div className="">
          <Button text={"Bestätigen"} onClick={() => addPlanHandler()} />
        </div>
      </div>
      {responseDiv}
    </div>
  );
}
