import { useState, useEffect } from 'react';
import PrayerCard from '../Navigation/PrayerCard';

function Prayer({ name = "Fazar" }) {
  const URL = `https://task-management-373m.onrender.com/${name}`;

  const [days, setDay] = useState(0);
  const [months, setMonth] = useState(0);
  const [years, setYear] = useState(0);
  const [exists, setExists] = useState(false);

  // Fetch prayer on component mount
  useEffect(() => {
    readPrayer();
    // eslint-disable-next-line
  }, []);

  function calculate() {
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

    if (!exists) {
      createPrayer(name, newDay, newMonth, newYear);
    } else {
      updatePrayer(name, newDay, newMonth, newYear);
    }
  }

  function createPrayer(name, day, month, year) {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, day, month, year }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Prayer created:", data);
        setExists(true);
        readPrayer();
      })
      .catch((err) => console.error("Failed to create prayer:", err));
  }

  function updatePrayer(name, day, month, year) {
    fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, day, month, year }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Prayer updated:", data);
        readPrayer();
      })
      .catch((err) => console.error("Failed to update prayer:", err));
  }

  function readPrayer() {
    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error("No prayer found");
        return res.json();
      })
      .then((data) => {
        if (data.day !== undefined) {
          setDay(data.day);
          setMonth(data.month);
          setYear(data.year);
          setExists(true);
        }
      })
      .catch((err) => {
        console.error("Unable to fetch prayer:", err);
        setExists(false);
      });
  }

  return (
    <PrayerCard
      name={name}
      day={days}
      month={months}
      year={years}
      onClick={calculate}
    />
  );
}

export default Prayer;