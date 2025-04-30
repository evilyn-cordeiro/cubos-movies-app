import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormInput } from "../../components";
import { login } from "../../services/userAuthServices";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
      navigate("/movies");
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: "error",
      });
    }
  };

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
          height: 242,
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
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <FormInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              marginTop: "28px",
            }}
          >
            <Link href="/forgot-password" underline="hover">
              Esqueci minha senha
            </Link>

            <Button
              type="submit"
              variant="contained"
              disabled={!email || !password}
              sx={{ minWidth: { sm: 83 } }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
