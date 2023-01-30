import { useRef } from "react";
import { Input } from "../global/Input";

export default function AddChildren({ id, changeChildren }) {
  const nameRef = useRef();
  const birthdayRef = useRef();
  const gradeRef = useRef();
  const descriptionRef = useRef();

  function onChange() {
    let json = {
      id: id,
      name: nameRef.current.value ?? "null",
      birthday: birthdayRef.current.value ?? "null",
      grade: gradeRef.current.value ?? "null",
      description: descriptionRef.current.value ?? "null",
    };
    changeChildren(json);
  }

  return (
    <div className="mt-4 card p-4">
      <p className="has-text-black ml-1 is-size-5">Kind {id + 1}</p>
      <div className="columns is-vcentered is-multiline">
        <div className="column is-two-fifth">
          <p className="has-text-black m-1">Vorname</p>
          <Input
            className=""
            type="text"
            placeholder="Vorname"
            ref={nameRef}
            onChange={() => onChange()}
          />
        </div>

        <div className="column is-one-quarter">
          <p className="has-text-black m-1">Geburtstag</p>
          <Input
            className=""
            type="date"
            placeholder="Geburtstag"
            ref={birthdayRef}
            onChange={() => onChange()}
          />
        </div>

        <div className="column is-one-quarter">
          <p className="has-text-black m-1">Klasse</p>
          <Input
            className=""
            type="number"
            placeholder="Klasse"
            ref={gradeRef}
            onChange={() => onChange()}
          />
        </div>
      </div>
      <div className="">
        <div className="">
          <p className="has-text-black m-1">Beschreibung [optional]</p>
          <Input
            className=""
            type="text"
            placeholder="Beschreibung"
            ref={descriptionRef}
            onChange={() => onChange()}
          />
        </div>
      </div>
    </div>
  );
}
