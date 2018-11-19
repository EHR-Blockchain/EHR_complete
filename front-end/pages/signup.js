import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Router from "next/router";
import config from "../config.js";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

// function SignIn(props) {
//   const { classes } = props;

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <main className={classes.layout}>
//         <Paper className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className={classes.form}>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="email">Doctor ID</InputLabel>
//               <Input id="doctor_id" name="doctor_id" autoComplete="email" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="password">Password</InputLabel>
//               <Input
//                 name="password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </FormControl>
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign in
//             </Button>
//           </form>
//         </Paper>
//       </main>
//     </React.Fragment>
//   );
// }

class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    qualifications: [],
    flat_number: "",
    street: "",
    city: "",
    country: "",
    pincode: ""
  };

  postData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses response to JSON
  };

  email_hanlder = e => {
    this.setState({ email: e.target.value });
  };

  fname_handler = e => {
    this.setState({ fname: e.target.value });
  };

  lname_handler = e => {
    this.setState({ lname: e.target.value });
  };

  qualification_handler = e => {
    this.setState({ qualifications: e.target.value.split(" ") });
  };

  flat_number_hanlder = e => {
    this.setState({ flat_number: e.target.value });
  };

  street_handler = e => {
    this.setState({ street: e.target.value });
  };

  city_handler = e => {
    this.setState({ city: e.target.value });
  };

  country_handler = e => {
    this.setState({ country: e.target.value });
  };

  pincode_handler = e => {
    this.setState({ pincode: e.target.value });
  };

  enterLoading = () => {
    fetch(`${config.apiurl}/api/Doctor`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        const patientIDno = response.length + 1;
        const docid = "EHR_doc_$" + patientIDno;

        const docotrPOSTData = {
          $class: "org.med.chain.Doctor",
          doctorId: docid
        };

        const doctorProfilePOSTData = {
          $class: "org.med.chain.DoctorProfile",
          profileId: docid,
          doctor: docid,
          firstName: this.state.fname,
          lastName: this.state.lname,
          EmailAddress: this.state.email,
          Dob: 1964,
          Qualifications: this.state.qualifications,
          ImageURL:
            "https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg",
          address: {
            $class: "org.med.chain.Address",
            number: this.state.flat_number,
            street: this.state.street,
            city: this.state.city,
            country: this.state.country,
            PinCode: this.state.pincode
          }
        };

        console.log(docotrPOSTData);
        console.log(doctorProfilePOSTData);

        this.postData(`${config.apiurl}/api/Doctor`, docotrPOSTData)
          .then(data => {
            console.log(JSON.stringify(data));
            //alert('Patient added');
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));

        setTimeout(() => {
          this.postData(
            `${config.apiurl}/api/DoctorProfile`,
            doctorProfilePOSTData
          )
            .then(data => {
              localStorage.setItem("docid", docid);
              console.log(JSON.stringify(data));
              Router.push(`/Dashboard`);
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
        }, 5000);
      });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.props.classes.layout}>
          <div style={{ display: "inline-block", width: "50%" }}>
            <Paper className={this.props.classes.paper}>
              <Typography component="h1" variant="h5">
                <strong>SignUp</strong>
              </Typography>
              <br />

              <Typography component="h3" variant="h5">
                Enter the details
              </Typography>
              <form className={this.props.classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Doctor email</InputLabel>
                  <Input
                    id="email"
                    onChange={this.email_hanlder}
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Set your Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">First Name</InputLabel>
                  <Input
                    name="firstName"
                    type="text"
                    onChange={this.fname_handler}
                    id="firstName"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Last Name</InputLabel>
                  <Input
                    name="lastName"
                    type="text"
                    onChange={this.lname_handler}
                    id="lastName"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Qualificaitions</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                    onChange={this.qualification_handler}
                  />
                </FormControl>
              </form>
            </Paper>
          </div>

          <div style={{ display: "inline-block", width: "50%" }}>
            <Paper
              className={this.props.classes.paper}
              style={{ marginLeft: 10 }}
            >
              <form
                className={this.props.classes.form}
                style={{ marginTop: "-15px", marginLeft: "20px" }}
              >
                <Typography style={{ marginTop: 20, fontSize: 20 }}>
                  Address
                </Typography>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">House Number</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Street</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">City</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Country</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">PinCode</InputLabel>
                  <Input
                    name="qualifications"
                    type="text"
                    id="qualifications"
                  />
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                  onClick={this.enterLoading}
                >
                  SIGN UP
                </Button>
              </form>
            </Paper>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
