import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validação com Yup
const schema = Yup.object().shape({
  title: Yup.string().required("Título é obrigatório"),
  originalTitle: Yup.string().required("Título original é obrigatório"),
  description: Yup.string().required("Descrição é obrigatória"),
  budget: Yup.number()
    .required("Orçamento é obrigatório")
    .min(0, "Orçamento não pode ser negativo"),
  releaseDate: Yup.date()
    .required("Data de lançamento é obrigatória")
    .min(new Date(), "Data de lançamento não pode ser no passado"),
  duration: Yup.number()
    .required("Duração é obrigatória")
    .min(1, "Duração mínima é 1 minuto"),
  genre: Yup.string().required("Gênero é obrigatório"),
});

interface AddMovieDrawerProps {
  open: boolean;
  onClose: () => void;
  onMovieAdded: () => void;
}

export const AddMovieDrawer = ({
  open,
  onClose,
  onMovieAdded,
}: AddMovieDrawerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: object) => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      onClose(); // Fecha o modal
      onMovieAdded(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Fundo escuro */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bgcolor="rgba(0,0,0,0.5)"
            zIndex={1200}
            onClick={onClose}
            sx={{
              backdropFilter: "blur(5px)",
            }}
          />

          <Box
            component={motion.div}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            position="fixed"
            top={0}
            right={0}
            height="100vh"
            width={{ xs: "100%", sm: "600px" }}
            bgcolor="background.paper"
            zIndex={1300}
            display="flex"
            flexDirection="column"
            p={2}
            sx={{
              overflow: "auto",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography variant="h5">Adicionar Filme</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap={2} flex={1}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Título"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="originalTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Título Original"
                      fullWidth
                      error={!!errors.originalTitle}
                      helperText={errors.originalTitle?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Descrição"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Orçamento"
                      fullWidth
                      type="number"
                      error={!!errors.budget}
                      helperText={errors.budget?.message}
                    />
                  )}
                />
                <Controller
                  name="releaseDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Data de Lançamento"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.releaseDate}
                      helperText={errors.releaseDate?.message}
                    />
                  )}
                />
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Duração (minutos)"
                      fullWidth
                      type="number"
                      error={!!errors.duration}
                      helperText={errors.duration?.message}
                    />
                  )}
                />
                <Controller
                  name="genre"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Gênero"
                      fullWidth
                      error={!!errors.genre}
                      helperText={errors.genre?.message}
                    />
                  )}
                />
              </Box>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button variant="outlined" onClick={onClose}>
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Adicionar
                </Button>
              </Box>
            </form>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};
