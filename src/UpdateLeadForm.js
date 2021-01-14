import myAxios from "./helpers/myAxios";
import React, { useEffect, useState } from "react";

function UpdateLeadForm({ handleClose, id, toggleIsOpen, comData }) {
  const [textData, setTextData] = useState("");

  useEffect(() => {
    if (comData !== "" && comData !== null) {
      setTextData(comData);
    }
  }, [comData]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    myAxios
      .put(`/api/mark_lead/${id}`, {
        communication: textData,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 202) {
            handleClose();
            toggleIsOpen();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="update_lead_form">
      <h1 style={{ backgroundColor: "black", color: "white", padding: "10px" }}>
        Update Lead Form
      </h1>
      <textarea
        name="communication"
        id=""
        cols="80"
        rows="10"
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
      ></textarea>
      <div>
        <button
          style={{
            position: "relative",
            right: "-80%",
            padding: "10px",
            marginRight: "10px",
          }}
          onClick={handleClose}
        >
          Close
        </button>
        <button
          style={{
            position: "relative",
            padding: "10px",
            right: "-80%",
            backgroundColor: "rgba(0,0,0,0.24)",
          }}
          type="submit"
          className="update_lead_btn"
          onClick={handleFormSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateLeadForm;
