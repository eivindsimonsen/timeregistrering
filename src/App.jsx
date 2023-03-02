import React, { useState, useEffect } from "react";
import "./sass/style.scss";

function App() {
  // State variabler for antall timer, timer, kommentarer og validering
  const [timeRecords, setTimeRecords] = useState([]);
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Henter verdi fra time input, og oppdaterer hours state til den verdien
  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  // Henter verdi fra kommentar input, og oppdaterer comment state til den verdien
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Når knappen blir aktivert, lagre verdiene i state i en ny variabel, som blir pushet til en array
  const handleSave = (event) => {
    event.preventDefault();
    const newTimeRecord = { hours, comment };
    setTimeRecords([...timeRecords, newTimeRecord]);
    setHours("");
    setComment("");
  };

  // Når slett knapp er trykket på, finner den korrosponderende index, og fjerner objektet med samme index fra arrayen
  const handleDelete = (index) => {
    const newTimeRecords = [...timeRecords];
    newTimeRecords.splice(index, 1);
    setTimeRecords(newTimeRecords);
  };

  // Henter alle timer fra alle objekter i arrayen, og legger dem sammen
  const getTotalHours = () => {
    return timeRecords.reduce((total, record) => {
      return total + parseInt(record.hours);
    }, 0);
  };

  // Hver gang getTotalHours funksjonen oppdateres, finn ut hvilke valideringsmelding som skal vises
  useEffect(() => {
    if (getTotalHours() >= 100) {
      setError(!false);
    } else {
      setError(false);
    }

    if (getTotalHours() > 0 && getTotalHours() < 100) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [getTotalHours]);

  // Innholdet som vises på skjerm
  return (
    <>
      <h1>Timeregistrering</h1>
      <div className="time-container">
        <form onSubmit={handleSave}>
          <div className="time-hours">
            <label>Timer:</label>
            <input type="number" value={hours} onChange={handleHoursChange} step="1" />
          </div>
          <div className="time-comment">
            <label>Kommentar:</label>
            <input type="text" value={comment} onChange={handleCommentChange} />
          </div>
          <button disabled={hours.length < 1 || comment.length < 1} className="cta--standard">
            Save
          </button>
        </form>
        <div>
          <h2>Time registreringer</h2>
          {timeRecords.map((record, index) => (
            <>
              <div className="time-records" key={index}>
                <p>
                  {parseInt(record.hours)} hours - {record.comment}
                </p>
                <button className="cta--alt" onClick={() => handleDelete(index)}>
                  Slett
                </button>
              </div>
              <hr />
            </>
          ))}
          <h2>Totale timer: {getTotalHours()}</h2>
          <div className={error ? "alert" : ""}>{error ? "Du har for mange timer! Max 100 timer" : ""}</div>
          <div className={success ? "success" : ""}>{success ? "Du er innenfor max antall timer!" : ""}</div>
        </div>
      </div>
    </>
  );
}

export default App;
