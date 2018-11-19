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
import Moment from "react-moment";
import PatientDisplay from "../components/patientDisplay";

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
    imageUrl: `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`,
    fullName: `Dr Pradeep Kamath`,
    email: `a@bg.com`,
    profileId: `EHR_doc_$12`,
    dateOfBirth: `12-23-1234`,
    qualification: `MBBS, MD`,
    contact: `+91 8123487123`,
    prescription: ``,
    description: ``,
    location: ``,
    medicalRecord: []
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
    const date = new Date();
    fetch(`${config.apiurl}/api/DoctorProfile/${localStorage.getItem("docid")}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
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
      });
    console.log("state", this.state);
    this.getPreviousDignosis();
  }

  getPreviousDignosis = () => {
    fetch(
      `${
        config.apiurl
      }/api/queries/selectMedicalRecordByPatientId?patientId=${localStorage.getItem(
        "pat_id"
      )}`
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        const record = [];
        for (let i = 0; i < response.length; i += 1) {
          record.push(response[i]);
        }
        this.setState({ medicalRecord: record });
      });
  };

  prescription_handler = e => {
    this.setState({ prescription: e.target.value });
  };

  description_handler = e => {
    this.setState({ description: e.target.value });
  };

  location_hanlder = e => {
    this.setState({ location: e.target.value });
  };

  handleFabOnclick = () => {
    this.setState({ fab_open: true });
  };

  handleFabClose = () => {
    this.setState({ fab_open: false });
  };

  hadleFabSubmit = () => {
    fetch(`${config.apiurl}/api/MedicalRecord`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        const recordLength = response.length + 1;
        const recordid = "EHR_diagnose_rec_" + recordLength;

        const diagnosePOSTData = {
          $class: "org.med.chain.MedicalRecord",
          recordId: recordid,
          patientId: localStorage.getItem("pat_id"),
          doctorId: localStorage.getItem("docid"),
          version: 0,
          authorized: [],
          description: this.state.description,
          prescription: this.state.prescription,
          encounterTime: "2018-11-01T16:46:31.650Z",
          location: this.state.location
        };

        this.postData(`${config.apiurl}/api/MedicalRecord`, diagnosePOSTData)
          .then(data => {
            console.log(JSON.stringify(data));
            //alert('Patient added');
            this.handleFabClose();
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
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
                <Reload onClick={this.getPreviousDignosis} />
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
            <Typography variant="h4" gutterBottom component="h2">
              Patient Details
            </Typography>

            <PatientDisplay medicalRecord={this.state.medicalRecord} />

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
              <center>Add a New Diagnosis</center>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the Details of Diagnosis below{" "}
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="desrciption"
                label="Description"
                type="text"
                fullWidth
                onChange={this.description_handler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="prescription"
                label="Prescription"
                type="text"
                fullWidth
                onChange={this.prescription_handler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="text"
                onChange={this.location_hanlder}
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
