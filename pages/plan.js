import Header from "../components/header/Header";
import Calendar from "../components/plan/Calendar";
import { hasCookie } from "cookies-next";
import { useEffect } from "react";
import Router from "next/router";

/**
 * page that fetches plan data from database and shows the calendar where people can plan if they will come to the sdf or not
 * @author Kilian Aaron Brinkner
 * @param {*} param0
 * @returns
 */
export default function Plan({ data, nextSunday }) {
  // if password not written yet, user will be forced to go on login page
  if (hasCookie("password") == false) {
    useEffect(() => {
      const { pathname } = Router;
      if (pathname == "/plan") {
        Router.push("/login");
      }
    });
  }
  return (
    <div>
      <Header />
      <Calendar data={data} nextSunday={nextSunday} />
    </div>
  );
}

export async function getStaticProps(context) {
  // check if dev or production server -> fetch the proper server address
  const dev = process.env.NODE_ENV !== "production";
  const server = dev
    ? "http://localhost:3000"
    : "https://your_deployment.server.com";

  const response = await fetch(`${server}/api/plan/get`);
  // const response = await fetch(`http://localhost:3000/api/data`);
  let data = await response.json();

  // Check if there is data for the next sunday ********************************
  // If there is already data for the next sunday, do not do anything here.
  // If there is not data for the next sunday, add the next sunday to the database
  // and after that fetch all the data again, which then includes the next sunday
  let currentSundayData;

  function nextDate(dayIndex) {
    var today = new Date();
    today.setDate(
      today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1
    );
    return today.toLocaleDateString();
  }

  var nextSunday = nextDate(7).toLocaleString();
  // nextSunday = "29.1.2023";
  // nextSunday = "19.2.2023";
  // nextSunday = "26.2.2023";

  // set the next sunday as first element to show
  data.forEach((element, index) => {
    if (element.date == nextSunday) {
      currentSundayData = data[index];
    }
  });

  const response2 = await checkIfSunday();

  data = await response2;

  async function checkIfSunday() {
    if (currentSundayData == null) {
      await addNewSunday();
      // ask a second time for data after new data has been inserted before
      const secondResponse = await fetch(`${server}/api/plan/get`);
      return secondResponse.json();
    } else {
      return data;
    }
  }

  async function addNewSunday() {
    return await fetch(`${server}/api/plan/add`, {
      method: "POST",
      body: JSON.stringify({ date: nextSunday, people: [] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return {
    props: { data, nextSunday }, // will be passed to the page component as props
  };
}
