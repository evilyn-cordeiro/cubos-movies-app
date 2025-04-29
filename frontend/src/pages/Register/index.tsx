// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormInput } from "../../components";
import { register } from "../../services/userAuthServices";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      enqueueSnackbar("Preencha todos os campos", { variant: "warning" });
      return;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar("As senhas não coincidem", { variant: "error" });
      return;
    }

    try {
      await register(name, email, password);
      enqueueSnackbar("Cadastro realizado com sucesso!", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      enqueueSnackbar("Erro ao cadastrar", {
        variant: "error",
      });
    }
  };

  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: 412,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <FormInput
            label="Nome"
            placeholder="Digite seu nome"
            type="text"
            value={name}
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <FormInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            label="Confirmar Senha"
            placeholder="Digite sua senha novamente"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            sx={{ marginTop: 2, minWidth: { sm: 83 } }}
          >
            Cadastrar
          </Button>

          <Link
            href="/login"
            underline="hover"
            textAlign="center"
            sx={{ marginTop: 1 }}
          >
            Já possui conta? Entrar
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
