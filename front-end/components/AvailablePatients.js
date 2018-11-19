import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import color from "@material-ui/core/colors/orange";
import Router from "next/router";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    background: "#edf4ff"
  }
};

class SimpleTable extends Component {
  state = {};

  onItemClick = pat_id => {
    localStorage.setItem("pat_id", pat_id);
    Router.push(`/Patient`);
  };

  render() {
    return (
      <Paper className={this.props.root}>
        <Table className={this.props.table}>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell numeric>Sex</TableCell>
              <TableCell numeric>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.patients.map(n => {
              return (
                <TableRow
                  key={n.id}
                  onClick={() => this.onItemClick(n.patientId)}
                >
                  <TableCell component="th" scope="row">
                    {n.patientId}
                  </TableCell>
                  <TableCell numeric>{n.gender}</TableCell>
                  <TableCell numeric>{n.age}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
