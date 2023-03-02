import React, { useState, useEffect } from "react";
import "./sass/style.scss";

function App() {
  const [timeRecords, setTimeRecords] = useState([]);
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const newTimeRecord = { hours, comment };
    setTimeRecords([...timeRecords, newTimeRecord]);
    setHours("");
    setComment("");
  };

  const handleDelete = (index) => {
    const newTimeRecords = [...timeRecords];
    newTimeRecords.splice(index, 1);
    setTimeRecords(newTimeRecords);
  };

  const getTotalHours = () => {
    return timeRecords.reduce((total, record) => {
      return total + parseInt(record.hours);
    }, 0);
  };

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

  return (
    <>
      <h1>Timeregistrering</h1>
      <div className="time-container">
        <form onSubmit={handleSave}>
          <div className="time-hours">
            <label>Timer:</label>
            <input type="number" value={hours} onChange={handleHoursChange} />
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
                  {record.hours} hours - {record.comment}
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
