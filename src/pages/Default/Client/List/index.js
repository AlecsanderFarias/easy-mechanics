import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Title from "../../../../Components/Title";

import { useHistory } from "react-router-dom";

import useStyles from "./styles";

// Generate Order Data
function createData(_id, name, email, phone) {
  return { _id, email, name, phone };
}

function Row({ data, view }) {
  const classes = useStyles();

  return (
    <TableRow key={data._id}>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{data.phone}</TableCell>
      <TableCell align="center">
        <div className={classes.line}>
          <IconButton onClick={() => view(data._id)}>
            <VisibilityIcon />
          </IconButton>

          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function List() {
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState([
    createData(0, "Alecs", "alecsfarias16@gmail.com", "(45) 9 99942-3876"),
    createData(1, "Alecs", "alecsfarias16@gmail.com", "(45) 9 99942-3876"),
    createData(2, "Alecs", "alecsfarias16@gmail.com", "(45) 9 99942-3876"),
    createData(3, "Alecs", "alecsfarias16@gmail.com", "(45) 9 99942-3876"),
    createData(4, "Alecs", "alecsfarias16@gmail.com", "(45) 9 99942-3876"),
  ]);

  function view(id) {
    history.push(`/client/${id}`);
  }

  function newClient() {
    history.push(`/client/new`);
  }

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Title>Clientes</Title>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Button color="primary" variant="contained" onClick={newClient}>
            Adicionar cliente
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <Row data={item} key={item._id} view={view} />
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}
