import { useState, useEffect } from 'react';
import PrayerCard from '../Navigation/PrayerCard';

function Prayer() {
  const URL = "https://task-management-373m.onrender.com/prayer";

  const [days, setDay] = useState(0);
  const [months, setMonth] = useState(0);
  const [years, setYear] = useState(0);

  useEffect(() => {
    ReadPrayer();
  }, []);

  function Calculate() {
    const prayerName = "Duhar";
    let newDay = days + 1;
    let newMonth = months;
    let newYear = years;

    if (newDay >= 30) {
      newDay = 0;
      newMonth += 1;
    }

    if (newMonth >= 12) {
      newMonth = 0;
      newYear += 1;
    }

    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);

    if (days === 0) {
      CreatePrayer(prayerName, newDay, newMonth, newYear);
    } else {
      UpdatePrayer(prayerName, newDay, newMonth, newYear);
    }
  }

  function CreatePrayer(name, day, month, year) {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, day, month, year })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Prayer created:", data);
        ReadPrayer();
      })
      .catch(error => console.error("Failed to create prayer:", error));
  }

  function UpdatePrayer(name, day, month, year) {
    fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, day, month, year })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Prayer updated:", data);
        ReadPrayer();
      })
      .catch(error => console.error("Failed to update prayer:", error));
  }

  function ReadPrayer() {
    return fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.day !== undefined) setDay(data.day);
        if (data.month !== undefined) setMonth(data.month);
        if (data.year !== undefined) setYear(data.year);
      })
      .catch(error => console.error("Unable to fetch data from backend:", error));
  }

  return (
    <PrayerCard
      name="Duhar"
      day={days}
      month={months}
      year={years}
      onClick={Calculate}
    />
  );
}

export default Prayer;