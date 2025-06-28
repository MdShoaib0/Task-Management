import { useState, useEffect } from 'react';
import PrayerCard from '../Navigation/PrayerCard';

function Magrib() {
  const name = "Magrib";
  const URL = `http://localhost:5000/prayer`;

  const [days, setDay] = useState(0);
  const [months, setMonth] = useState(0);
  const [years, setYear] = useState(0);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    readPrayer();
  }, []);

  function calculate() {
    createPrayer(name, days + 1);
  }

  async function createPrayer(name, day) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, day })
      });

      if (!response.ok) {
        throw new Error("Failed to create prayer entry");
      }

      const data = await response.json();
      console.log("Prayer created:", data);

      await readPrayer();
    } catch (error) {
      console.error("Error creating prayer:", error);
    }
  }

  async function readPrayer() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to fetch Prayer details");
      }
      const data = await response.json();
      
      const prayer = data.find(p => p.name === name);
      if (prayer) {
        setDay(prayer.day);
        setExists(true);
        console.log("Prayer loaded:", prayer.day);
      } else {
        setDay(0);
        setExists(false);
      }

    } catch (error) {
      console.error(error);
    }
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

export default Magrib;