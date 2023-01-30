import { useState } from "react";
import Response from "../../pages/api/response";
import Input from "../global/Input";
import Result from "./Result";
import classes from "../global/Input.module.css";

export default function Search({ data }) {
  //const data = Response;
  //console.log(data);
  const [resultArray, setResultArray] = useState([]);

  const handleChange = function (event) {
    setResultArray([]);
    let tempArray = [];

    // avoid cross site scripting
    var stripTagsRE = /<\/?[^>]+>[=(]->/gi;
    let searchedName = event.target.value.replace(stripTagsRE, "");

    let array = data;
    for (let n = 0; n < array.length; n++) {
      let currentChildren = array[n].children;

      for (let m = 0; m < currentChildren.length; m++) {
        if (
          currentChildren[m].name
            .toLowerCase()
            .includes(searchedName.toLowerCase()) &&
          isAlreadyInArray(array[n].family, tempArray) == false
        ) {
          console.log(array[n]);

          tempArray.push(array[n]);
        }
      }
    }
    //console.log(tempArray);
    setResultArray(tempArray);
  };

  // if two names include the same searchedName, then show only one
  function isAlreadyInArray(familyName, tempArray) {
    console.log(familyName);
    console.log(tempArray);
    for (let n = 0; n < tempArray.length; n++) {
      if (familyName == tempArray[n].family) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="columns">
      <div className="m-5 column is-5-desktop is-6-tablet is-11-mobile">
        <input
          className={`${classes.customInput}`}
          type="text"
          placeholder="Namen eingeben"
          onChange={handleChange}
        />
        <div className="mt-3">
          {resultArray?.map((result) => (
            <Result key={result.family} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}
