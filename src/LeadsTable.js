import React, { useState, useEffect } from "react";
import CustomPopup from "./SimpleModal";
import myAxios from "./helpers/myAxios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  id,
  name,
  email,
  mobile,
  locationType,
  locationString,
  comData
) {
  return { id, name, email, mobile, locationType, locationString, comData };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function LeadsTable({ toggleDelete, changed }) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);

  myAxios.post("/api/reset-db");

  useEffect(() => {
    async function getLeads() {
      await myAxios("/api/leads/")
        .then((result) =>
          setRows(
            result.data.map((res) =>
              createData(
                res.id,
                `${res.first_name} ${res.last_name}`,
                res.email,
                res.mobile,
                res.location_type,
                res.location_string,
                res.communication
              )
            )
          )
        )
        .catch((err) => console.log(err));
    }
    getLeads();
  }, [isOpen, changed]);

  function toggleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div>
      <CustomPopup
        buttonName="Add Lead"
        className="add_lead_modal_btn"
        toggleIsOpen={toggleIsOpen}
      />
      <hr />
      <TableContainer component={Paper}>
        <Table
          className={classes.table + " leads_table"}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Mobile Num</StyledTableCell>
              <StyledTableCell align="center">Location Type</StyledTableCell>
              <StyledTableCell align="center">Location String</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== undefined
              ? rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.mobile}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.locationType}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.locationString}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        display: "flex",
                      }}
                    >
                      <CustomPopup
                        id={row.id}
                        className="update_lead_modal_btn"
                        buttonName="Mark Update"
                        comData={row.comData}
                        toggleIsOpen={toggleIsOpen}
                      />
                      <CustomPopup
                        id={row.id}
                        className="delete_lead_modal_btn"
                        buttonName="Delete"
                        toggleDelete={toggleDelete}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeadsTable;
