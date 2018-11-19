import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class MainListItems extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem> */}

        <ListItem>
          <strong>Doctor_ID: &nbsp; </strong>
          <div> {localStorage.getItem("docid")}</div>
        </ListItem>

        <ListItem>
          <div>
            <img src={this.props.imageURL} />
          </div>
        </ListItem>

        <ListItem>
          <strong>Name: &nbsp; </strong>
          <div> {this.props.name}</div>
        </ListItem>

        <ListItem>
          <strong>E-Mail: &nbsp;</strong> {this.props.email}
        </ListItem>

        <ListItem>
          <strong>Contact:&nbsp; </strong> {this.props.contact}
        </ListItem>

        <ListItem>
          <strong>Qualification:&nbsp; </strong> {this.props.qualification}
        </ListItem>
      </div>
    );
  }
}

export default MainListItems;
