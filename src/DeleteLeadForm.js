import myAxios from "./helpers/myAxios";
import React from "react";

function DeleteLeadForm({ handleClose, id, toggleDelete }) {
  async function handleDelete(e) {
    e.preventDefault();
    myAxios.delete(`/api/leads/${id}`, {}).then(
      (response) => {
        console.log(response);
        if (response.status === 204) {
          handleClose();
          toggleDelete();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div>
      <div
        className="header"
        style={{
          textAlign: "center",

          height: "60px",
          backgroundColor: "black",
          width: "100%",
          padding: "10px , 0",
          marginBottom: "10px",
        }}
      >
        <h1 style={{ color: "white" }}>
          Do you wish to delete this Lead? id: {id}
        </h1>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="delete_lead_form"
      >
        <button
          className="delete_lead_btn"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "12px",
            marginRight: "10px",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "12px",
          }}
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteLeadForm;
