import React, { Component } from "react";
import { Grid, Paper, MenuList, MenuItem } from "@material-ui/core";

// const styles = {
//   Paper: {
//     padding: "10px",
//     margin: "10px"
//   },
//   Grid: {
//     padding: "10px",
//     margin: "10px"
//   },
//   Typography: {
//     alignItems: "center",
//     margin: 10
//   },
//   TextField: {
//     padding: "10px",
//     marginTop: "5px",
//     marginBottom: "25px",
//     marginRight: "25px",
//     marginLeft: "25px",
//     largetext: {
//       width: "75%",
//       padding: "10px",
//       marginTop: "5px",
//       marginBottom: "25px",
//       marginRight: "25px",
//       marginLeft: "25px"
//     }
//   },
//   Menu: {
//     padding: "10px",
//     marginTop: "70px",
//     width: 120,
//     backgroundColor: "#54A391"
//   },
//   MenuItem: {
//     backgroundColor: "#54A391",
//     color: "white",
//     marginBottom: 2,
//     outlineColor: "white",
//     outlineWidth: "1px"
//   }
// };

const styleq = {
  first: {
    display: "inline",
    float: "left",
    width: "25%"
  },
  second: {
    display: "inline-block",
    margin: "0 32px 16px 0",
    width: "900px"
  }
};

export default class NavigationMenu extends Component {
  render() {
    return (
      <Grid container>
        <Grid item md={12}>
          <Paper style={styleq.second}>
            <MenuList>
              <MenuItem
                style={styleq.first}
                onClick={() => {
                  this.props.handleClick("Home");
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                style={styleq.first}
                onClick={() => {
                  this.props.handleClick("Men");
                }}
              >
                Men
              </MenuItem>
              <MenuItem
                style={styleq.first}
                onClick={() => {
                  this.props.handleClick("Women");
                }}
              >
                Women
              </MenuItem>
              {this.props.loggedin === "Admin" && (
                <MenuItem
                  style={styleq.first}
                  onClick={() => {
                    this.props.handleClick("Adminpanel");
                  }}
                >
                  Admin Panel
                </MenuItem>
              )}
              {this.props.loggedin === "Customer" && (
                <MenuItem
                  style={styleq.first}
                  onClick={() => {
                    this.props.handleClick("Myaccount");
                  }}
                >
                  My Account
                </MenuItem>
              )}
            </MenuList>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
