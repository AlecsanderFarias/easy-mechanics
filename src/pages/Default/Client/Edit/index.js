import { useState, useRef, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";

import Title from "../../../../Components/Title";
import Input from "../../../../Components/Input";

import api from "../../../../services/api";

import useStyles from "./styles";

export default function View({ match }) {
  const { id } = match?.params || {};
  const history = useHistory();
  const classes = useStyles();
  const form = useRef();

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingExclue, setLoadingExclue] = useState(false);

  async function getData() {
    try {
      setLoading(true);

      const response = await api.get(`/user/${id}`);

      setData(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Ocorreu algum erro, tente novamente mais tarde"
      );

      history.push("/home");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    console.log(data);
  }

  async function handleDelete() {}

  useEffect(() => {
    if (id !== "new") {
      console.log(id);

      getData();
    }
  }, []);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{id === "new" ? "Adicionar Cliente" : "Editar Cliente"}</Title>
        </Grid>

        <Grid item xs={12}>
          <Form onSubmit={onSubmit} ref={form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Input name="name" label="Nome" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input name="email" label="E-mail" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input name="phone" label="Telefone" />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Title>Veículos</Title>
                  </Grid>

                  <Grid item xs={12}>
                    <Title>Orçamentos</Title>
                  </Grid>

                  <Grid item xs={12}>
                    <Container maxWidth="sm">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={loading || loadingExclue}
                          >
                            {loading ? (
                              <CircularProgress size={20} />
                            ) : id !== "new" ? (
                              "Salvar"
                            ) : (
                              "Adicionar"
                            )}
                          </Button>
                        </Grid>

                        {id !== "new" && (
                          <Grid item xs={12}>
                            <Button
                              color="secondary"
                              variant="contained"
                              fullWidth
                              disabled={loading || loadingExclue}
                              onClick={handleDelete}
                              type="button"
                            >
                              {loadingExclue ? (
                                <CircularProgress size={20} />
                              ) : (
                                "Excluir"
                              )}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Container>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Grid>
      </Grid>
    </Paper>
  );
}
