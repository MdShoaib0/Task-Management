import { useState, useEffect } from 'react';
import PrayerCard from '../Navigation/PrayerCard';

function Namazs() {
  const URL = `https://task-management-373m.onrender.com/prayer`;

  // List of prayers
  const prayerNames = ["Fazar", "Duhar", "Ashar", "Magrib", "Esha"];

  // State to track prayer counts for each namaz
  const [prayerDays, setPrayerDays] = useState({
    Fazar: 0,
    Duhar: 0,
    Ashar: 0,
    Magrib: 0,
    Esha: 0
  });

  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);

  // Load initial prayer data on component mount
  useEffect(() => {
    readPrayer();
  }, []);

  // Function to handle increment and server update for a given prayer
  async function calculate(namazName) {
    const updatedDay = prayerDays[namazName] + 1;

    // Update UI immediately
    setPrayerDays(prev => ({
      ...prev,
      [namazName]: updatedDay
    }));

    // Save to server
    await createPrayer(namazName, updatedDay);
  }

  // Function to send POST request to backend to create/update a prayer entry
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

      // Reload latest data after update
      await readPrayer();

    } catch (error) {
      console.error("Error creating prayer:", error);
    }
  }

  // Function to read prayer data from the server and update state
  async function readPrayer() {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Failed to fetch Prayer details");
      }

      const data = await response.json();

      // Create a temporary object to hold updated counts
      const updatedCounts = {
        Fazar: 0,
        Duhar: 0,
        Ashar: 0,
        Magrib: 0,
        Esha: 0
      };

      // Update only if prayer exists in data
      data.forEach(p => {
        if (updatedCounts.hasOwnProperty(p.name)) {
          updatedCounts[p.name] = p.day;
        }
      });

      setPrayerDays(updatedCounts);

    } catch (error) {
      console.error("Error reading prayer data:", error);
    }
  }

  return (
    <div className='w-full h-auto py-8'>
      <h1 className='text-center text-4xl sm:text-5xl font-bold mb-12 text-gray-800'>🕌 Prayer Tracker</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8'>
        {
          prayerNames.map((namazName) => (
            <PrayerCard
              key={namazName}
              name={namazName}
              day={prayerDays[namazName]}
              month={months}
              year={years}
              onClick={() => calculate(namazName)}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Namazs;