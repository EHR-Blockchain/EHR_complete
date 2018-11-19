import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SecondaryListItems from "../components/secondaryListItems";
import MainListItems from "../components/mainListItems";
import Fab from "../components/Fab";
import config from "../config";
import Reload from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AvailablePatients from "../components/AvailablePatients";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    fab_open: false,
    name: "Dr Kamath",
    imageUrl: ``,
    fullName: `Dr Pradeep Kamath`,
    email: `a@bg.com`,
    profileId: `EHR_doc_$12`,
    dateOfBirth: `12-23-1234`,
    qualification: `MBBS, MD`,
    contact: `+91 8123487123`,
    patients: [],
    pat_id: "",
    fname: "",
    lname: "",
    pat_email: "",
    pat_DOB: "",
    pat_flat_no: "",
    street: "",
    city: "",
    country: "",
    pinCode: "",
    gender: "",
    age: ""
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

  componentDidMount() {
    fetch(`${config.apiurl}/api/DoctorProfile/${localStorage.getItem("docid")}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log("res", response);
        this.setState({
          name: response.firstName,
          imageUrl: `${response.ImageURL}`,
          fullName: `${response.firstName} ${response.lastName}`,
          email: response.EmailAddress,
          profileId: response.profile_id,
          dateOfBirth: `${response.Dob}`,
          qualification: `${response.Qualifications}`,
          contact: "+91 8123487123"
        });
        console.log("state", this.state);
      });
    this.getAllowedPatient();
  }

  getAllowedPatient = () => {
    fetch(`${config.apiurl}/api/Patient`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        const pat = [];
        for (let i = 0; i < response.length; i += 1) {
          if (
            response[i].authorized.indexOf(localStorage.getItem("docid")) !== -1
          ) {
            pat.push(response[i]);
          }
        }
        this.setState({ patients: pat });
      });
  };

  pat_id_hanler = e => {
    this.setState({
      pat_id: e.target.value
    });
  };

  fname_handler = e => {
    this.setState({
      fname: e.target.value
    });
  };

  lname_handler = e => {
    this.setState({
      lname: e.target.value
    });
  };

  email_hadler = e => {
    this.setState({
      pat_email: e.target.value
    });
  };

  dob_handler = e => {
    this.setState({
      pat_DOB: e.target.value
    });
  };

  flatNo_handler = e => {
    this.setState({
      pat_flat_no: e.target.value
    });
  };

  street_handler = e => {
    this.setState({
      street: e.target.value
    });
  };

  city_handler = e => {
    this.setState({
      city: e.target.value
    });
  };

  country_handler = e => {
    this.setState({
      country: e.target.value
    });
  };

  pindoce_hanlder = e => {
    this.setState({
      pinCode: e.target.value
    });
  };

  gender_hanlder = e => {
    this.setState({
      gender: e.target.value
    });
  };

  age_hanlder = e => {
    this.setState({
      age: e.target.value
    });
  };

  handleFabOnclick = () => {
    this.setState({ fab_open: true });
  };

  handleFabClose = () => {
    this.setState({ fab_open: false });
  };

  hadleFabSubmit = () => {
    console.log(this.state);
    fetch(`${config.apiurl}/api/Patient`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        const patientIDno = response.length + 1;
        const patientID = "EHR_pat_" + patientIDno;

        const patientPOSTData = {
          $class: "org.med.chain.Patient",
          patientId: patientID,
          authorized: [localStorage.getItem("docid")],
          gender: this.state.gender,
          age: this.state.age
        };

        const patientProfilePOSTData = {
          $class: "org.med.chain.PatientProfile",
          patient: patientID,
          profileId: patientID,
          firstName: this.state.fname,
          lastName: this.state.lname,
          EmailAddress: this.state.pat_email,
          Dob: 1998,
          address: {
            $class: "org.med.chain.Address",
            number: this.state.pat_flat_no,
            street: this.state.street,
            city: this.state.city,
            country: this.state.country,
            PinCode: this.state.pinCode
          }
        };

        console.log(patientPOSTData);
        console.log(patientProfilePOSTData);

        this.postData(`${config.apiurl}/api/Patient`, patientPOSTData)
          .then(data => {
            console.log(JSON.stringify(data));
            //alert('Patient added');
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));

        setTimeout(() => {
          this.postData(
            `${config.apiurl}/api/PatientProfile`,
            patientProfilePOSTData
          )
            .then(data => {
              console.log(JSON.stringify(data));
              this.setState({ fab_open: false });
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
        }, 5000);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Reload onClick={this.getAllowedPatient} />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            {/* <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div> */}
            <Divider />
            <List>
              <MainListItems
                name={this.state.name}
                email={this.state.email}
                contact={this.state.contact}
                qualification={this.state.qualification}
                imageURL={this.state.imageUrl}
              />
            </List>
            <Divider />
            <List>
              <SecondaryListItems />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h2" />

            <AvailablePatients patients={this.state.patients} />

            <div style={{ position: "absolute", right: 25, bottom: 25 }}>
              <Fab onClick={this.handleFabOnclick} />
            </div>
          </main>
          <Dialog
            open={this.state.fab_open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <center>Add a New Patient</center>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the Patient Details below to add him/her to the Records
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="patientID"
                label="Patient ID"
                type="text"
                fullWidth
                onChange={this.pat_id_hanler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                onChange={this.fname_handler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                onChange={this.lname_handler}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                onChange={this.email_hadler}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="gender"
                label="Gender"
                type="text"
                onChange={this.gender_hanlder}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="age"
                label="Age"
                type="number"
                onChange={this.age_hanlder}
                fullWidth
              />
              <p style={{ color: "grey" }}>Date of Birth</p>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label=""
                type="date"
                onChange={this.dob_handler}
                fullWidth
              />

              <p style={{ color: "grey" }}>Address</p>
              <TextField
                autoFocus
                margin="dense"
                id="flatNumber"
                label="Flat Number"
                type="number"
                onChange={this.flatNo_handler}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="street"
                label="Street"
                type="text"
                onChange={this.street_handler}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="city"
                label="City"
                type="text"
                onChange={this.city_handler}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="country"
                label="Country"
                type="text"
                onChange={this.country_handler}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="pinCode"
                label="PIN Code"
                type="text"
                onChange={this.pindoce_hanlder}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleFabClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.hadleFabSubmit} color="primary">
                ADD
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
