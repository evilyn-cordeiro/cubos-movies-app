import * as Yup from "yup";
export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+){1,}$/, "Informe seu nome e sobrenome")
    .required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmar senha é obrigatório"),
});
