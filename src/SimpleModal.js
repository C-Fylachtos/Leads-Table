import React from "react";
import UpdateLeadForm from "./UpdateLeadForm";
import DeleteLeadForm from "./DeleteLeadForm";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddLeadForm from "./AddLeadForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  buttonName,
  toggleIsOpen,
  id,
  comData,
  toggleDelete,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body =
    buttonName === "Add Lead" ? (
      <div style={modalStyle} className={classes.paper}>
        <AddLeadForm handleClose={handleClose} toggleIsOpen={toggleIsOpen} />
      </div>
    ) : buttonName === "Mark Update" ? (
      <div style={modalStyle} className={classes.paper}>
        <UpdateLeadForm
          handleClose={handleClose}
          id={id}
          toggleIsOpen={toggleIsOpen}
          comData={comData}
        />
      </div>
    ) : (
      <div style={modalStyle} className={classes.paper}>
        <DeleteLeadForm
          handleClose={handleClose}
          id={id}
          toggleDelete={toggleDelete}
        />
      </div>
    );
  const buttonClass =
    buttonName === "Add Lead"
      ? "add_lead_modal_btn"
      : buttonName === "Mark Update"
      ? "update_lead_modal_btn"
      : "delete_lead_modal_btn";
  return (
    <div style={{ boxSizing: "border-box" }}>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        type="button"
        className={buttonClass}
        onClick={handleOpen}
      >
        {buttonName}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
