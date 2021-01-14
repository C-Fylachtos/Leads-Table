import React, { useEffect, useState } from "react";
import { useFormFields } from "./hooks/hook";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import myAxios from "./helpers/myAxios";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AddLeadForm({ handleClose, toggleIsOpen }) {
  const classes = useStyles();
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    locationType: "",
    locationString: "",
  });

  useEffect(() => {
    if (
      fields.firstName !== "" &&
      fields.lastName !== "" &&
      fields.email !== "" &&
      fields.mobile !== "" &&
      fields.locationType !== "" &&
      fields.locationString !== ""
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [fields]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    myAxios
      .post("/api/leads/", {
        first_name: fields.firstName,
        last_name: fields.lastName,
        mobile: fields.mobile,
        email: fields.email,
        location_type: fields.locationType,
        location_string: fields.locationString,
      })
      .then(
        (response) => {
          if (response.status === 201) {
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
    <>
      <h1
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "10px",
        }}
      >
        Add Lead
      </h1>
      <form
        className={classes.root + " add_lead_form"}
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          name="first_name"
          id="firstName"
          label="First Name"
          variant="outlined"
          value={fields.firstName}
          onChange={handleFieldChange}
        />

        <TextField
          name="last_name"
          id="lastName"
          label="Last Name"
          variant="outlined"
          value={fields.lastName}
          onChange={handleFieldChange}
        />

        <TextField
          name="email"
          id="email"
          label="Email"
          variant="outlined"
          value={fields.email}
          onChange={handleFieldChange}
        />
        <TextField
          name="mobile"
          id="mobile"
          label="Mobile"
          variant="outlined"
          value={fields.mobile}
          onChange={handleFieldChange}
        />

        <TextField
          name="location_type"
          id="locationType"
          label="Location Type"
          variant="outlined"
          value={fields.locationType}
          onChange={handleFieldChange}
          select
          SelectProps={{
            native: true,
          }}
          helperText="Please select your location type"
        >
          {<option value="" defaultValue disabled hidden></option>}
          {
            <option key={11111} value="City">
              City
            </option>
          }
          {
            <option key={22222} value="Zip">
              Zip
            </option>
          }
          {
            <option key={33333} value="Country">
              Country
            </option>
          }
        </TextField>
        <TextField
          name="location_string"
          id="locationString"
          label="Location String"
          variant="outlined"
          value={fields.locationString}
          onChange={handleFieldChange}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              position: "relative",
              right: "-100%",
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
              right: "-100%",
              backgroundColor: "rgba(0,0,0,0.24)",
            }}
            type="submit"
            className="add_lead_btn"
            disabled={disabledBtn}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
