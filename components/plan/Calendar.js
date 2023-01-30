import { useState } from "react";
import Day from "./Day";
// import LoadingScreen from "../react-loading-screen";

/**
 * Shows calendar where people can plan if they will come to the sdf on the next sunday or if they wont come
 * @author Kilian Aaron Brinkner
 * @param {*} data from getStaticProps
 * @returns
 */
export default function Calendar({ data, nextSunday }) {
  const [nextSundayData, setNextSundayData] = useState(data);
  const [dataSet, setDataSet] = useState(false);

  if (dataSet == false) {
    data?.forEach((element, index) => {
      console.log("element.date" + element.date + " nextSunday:" + nextSunday);
      if (element.date == nextSunday) {
        setDataSet(true);
        setNextSundayData(data[index]);
      }
    });
  }

  return (
    <div className="columns">
      <div className="column is-6-desktop is-7-tablet">
        {nextSundayData ? (
          <Day date={nextSunday} data={nextSundayData}></Day>
        ) : null}
      </div>
    </div>
  );
}
