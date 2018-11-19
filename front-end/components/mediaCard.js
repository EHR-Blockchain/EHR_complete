import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

class MediaCard extends Component {
  state = {};

  render() {
    return (
      <Card className={this.props.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>Description: {this.props.description}</strong>
            </Typography>
            <Typography component="p">
              Diagonised by <strong>"doctorId": "{this.props.doc}</strong>
            </Typography>
            <br />
            <Typography component="p">
              Prescription:{" "}
              <strong>"prescription": {this.props.prescription}</strong>
            </Typography>

            <Typography component="p">
              Time
              <strong>"encounterTime": {this.props.encounterTime}</strong>
              <br />
              Location
              <strong>"location": {this.props.location}</strong>
            </Typography>
            <br />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
