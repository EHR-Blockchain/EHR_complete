import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import config from "../config";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends Component {
  state = {
    profileId: "pat1",
    firstName: "Shyam",
    lastName: "Kumar",
    EmailAddress: "shyam123@gmail.com",
    Dob: 10101928,
    PinCode: "123312",
    City: "bang"
  };
  componentDidMount() {
    fetch(
      `${config.apiurl}/api/PatientProfile/${localStorage.getItem("pat_id")}`
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        this.setState({
          profileId: response.profileId,
          firstName: response.firstName,
          lastName: response.lastName,
          EmailAddress: response.EmailAddress,
          Dob: response.Dob
        });
      });
  }
  render() {
    return (
      <Card className={this.props.card}>
        <CardContent>
          <Typography
            className={this.props.title}
            color="textSecondary"
            gutterBottom
          >
            Patient Profile
          </Typography>

          <Typography variant="h5" component="h2">
            {this.state.firstName}
            &nbsp;
            {this.state.lastName}
          </Typography>

          <Typography className={this.props.pos} color="textSecondary">
            20 M
          </Typography>

          <Typography component="p">
            DOB : <span>{this.state.Dob}</span>
            <br />
            City : <span>Ahmedabad</span>
            <br />
            PinCode : <span>380015</span>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
