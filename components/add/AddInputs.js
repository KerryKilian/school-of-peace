import { useRef, useState } from "react";
import AddChildren from "./AddChildren";
import Button from "../global/Button";
import { Input } from "../global/Input";
import classes from "./AddInput.module.css";

export default function AddInputs() {
  const [inputList, setInputList] = useState([]);
  const familyInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  // HELP FOLGENDES AUSKOMMENTIERT
  const [nameRefs, setNameRefs] = useState([]);
  const [birthdayRefs, setBirthdayRefs] = useState([]);
  const [gradeRefs, setGradeRefs] = useState([]);
  const [descriptionRefs, setDescriptionRefs] = useState([]);

  const [children, setChildren] = useState({ list: null }); // USE NORMAL ARRAY INSTEAD OF USESTATE
  let childrenList = [];
  // gets called from child component
  const changeChildren = (json) => {
    let childrenID = findElement(json.id);
    if (childrenID != -1) {
      childrenList[childrenID] = json;
    } else {
      childrenList.push(json);
    }
    //console.log(childrenList);
    setChildren((prev) => {
      [childrenList];
    });

    const jsonStringify = JSON.stringify(childrenList);
    localStorage.setItem("children", jsonStringify);
  };

  // check if child is already exiting in useState, so I can determine if I need to update child or add new child
  function findElement(id) {
    for (let n = 0; n < childrenList.length; n++) {
      if (childrenList[n]) {
        if (childrenList[n].id == id) {
          return n;
        }
      }
    }
    console.log("child is not existing");
    return -1;
  }

  // send data to /api/addFamily
  async function addFamilyHandler() {
    let enteredFamily = familyInputRef.current.value;
    let enteredAddress = addressInputRef.current.value;
    let enteredDescription = descriptionInputRef.current.value ?? null;

    let childrenArray = [];
    for (let n = 0; n < nameRefs.length; n++) {
      childrenArray.push({
        name: nameRefs[n],
        birthday: birthdayRefs[n],
        grade: gradeRefs[n],
        descriptionRef: descriptionRefs[n],
      });
    }

    // get data from children components

    const saved = localStorage.getItem("children");
    const savedJson = JSON.parse(saved);
    //console.log(savedJson);
    console.log(enteredAddress);
    let lat = 0;
    let lon = 0;
    await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${enteredAddress}.json?access_token=<AccesToken>`
    )
      .then((res) => res.json())
      .then((data) => {
        lat = data.features[0].geometry.coordinates[1];
        lon = data.features[0].geometry.coordinates[0];
      })
      .catch((err) => {
        console.log(err.message);
      });

    const familyData = {
      family: enteredFamily,
      address: enteredAddress,
      coordinates: [lat, lon],
      description: enteredDescription,
      children: savedJson,
    };
    console.log(familyData);

    const response = await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify(familyData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  const options = [1, 2, 3, 4, 5];

  function onDropdownSelect(event) {
    console.log(event.target.value);
    setInputList((inputList.length = 0));
    setInputList(
      inputList.concat(
        <div>
          {options.map((indexplus1) => {
            if (indexplus1 < parseInt(event.target.value) + 1) {
              return (
                <AddChildren
                  // key={Math.floor(Math.random() * 100)}
                  key={indexplus1}
                  id={indexplus1 - 1}
                  changeChildren={changeChildren}
                />
              );
            }
          })}
        </div>
      )
    );
  }

  return (
    <div>
      <div className="m-2 columns">
        <div className="column is-12-tablet is-7-desktop">
          <h1 className="subtitle">Erstelle einen neuen Familieneintrag</h1>
          <p className="has-text-black m-2">Familienname</p>

          <Input type="text" placeholder="Familienname" ref={familyInputRef} />
          <p className="has-text-black m-2">Adresse</p>
          <Input
            type="text"
            placeholder="Straße Hausnummer, PLZ Ort"
            ref={addressInputRef}
          />
          <p className="has-text-black m-2">Beschreibung [optional]</p>
          <Input
            type="text"
            placeholder="Beschreibung"
            ref={descriptionInputRef}
          />
          <p className="has-text-black m-2">Anzahl Kinder</p>
          <select
            name="dropdown"
            id="dropdown"
            className={classes.dropdown}
            onChange={(e) => {
              onDropdownSelect(e);
            }}
            defaultValue="0"
          >
            <option value="0" className="dropdownItem">
              0
            </option>
            <option value="1" className="dropdownItem">
              1
            </option>
            <option value="2" className="dropdownItem">
              2
            </option>
            <option value="3" className="dropdownItem">
              3
            </option>
            <option value="4" className="dropdownItem">
              4
            </option>
            <option value="5" className="dropdownItem">
              5
            </option>
          </select>

          {inputList}
          <div className="is-flex">
            <div className={`${classes.button}`}>
              <Button
                //className="mt-4 ml-2 button is-primary"
                onClick={() => addFamilyHandler()}
                text="Speichern"
              >
                Speichern
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
