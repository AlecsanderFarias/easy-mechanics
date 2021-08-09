/* eslint-disable import/no-anonymous-default-export */
import * as Yup from "yup";

export default async (data) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Digite um e-mail.")
      .email("Escreva um e-mail válido"),
    password: Yup.string().required("Digite uma senha."),
  });

  await schema.validate(data, { abortEarly: false });
};
