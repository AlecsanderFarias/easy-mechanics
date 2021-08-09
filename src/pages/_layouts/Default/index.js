import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Drawer from "../../../Components/Drawer";
import Header from "../../../Components/Header";

import useStyles from "./styles";

const drawerWidth = 240;

export default function Dashboard({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} trogle={() => setOpen((prev) => !prev)} />
      <Drawer open={open} trogle={() => setOpen((prev) => !prev)} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}
