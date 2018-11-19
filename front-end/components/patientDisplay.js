import React, { Component } from "react";
import SimpleCard from "./card.js";
import MediaCard from "./mediaCard.js";
import Grid from "@material-ui/core/Grid";
import config from "../config";

class PatientDisplay extends Component {
  state = {};
  render() {
    return (
      <div>
        <SimpleCard />

        <br />
        <br />

        <Grid container spacing={24}>
          {this.props.medicalRecord.map(n => {
            return (
              <Grid item md={4}>
                <MediaCard
                  prescription={n.prescription}
                  description={n.description}
                  location={n.location}
                  doc={n.doctorId}
                  recordId={n.recordId}
                  encounterTime={n.encounterTime}
                />
              </Grid>
            );
          })}
        </Grid>

        <br />
        <br />
      </div>
    );
  }
}

export default PatientDisplay;
