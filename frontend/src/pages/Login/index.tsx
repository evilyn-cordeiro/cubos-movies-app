import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormInput } from "../../components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
        navigate("/home");
      } else {
        const errorData = await response.json();
        enqueueSnackbar(errorData.message || "Credenciais inválidas", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      enqueueSnackbar("Erro ao conectar com o servidor.", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        height: "100vh",
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
            <Link href="/forgot-password" underline="hover" variant="body2">
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
