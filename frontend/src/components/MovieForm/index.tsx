import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../FormInput";
import { useSnackbar } from "notistack";

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
  imageUrl: Yup.mixed().required("Imagem é obrigatória"),
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
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = async (data: object) => {
    const token = localStorage.getItem("token");
    console.log(data);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "imageUrl" && value instanceof File) {
          formData.append(key, value); // Adiciona o arquivo corretamente
        } else {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar filme");
      }

      enqueueSnackbar("Filme adicionado com sucesso!", { variant: "success" });
      onClose();
      onMovieAdded();
      reset();
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      enqueueSnackbar("Erro ao adicionar filme. Tente novamente.", {
        variant: "error",
      });
      onClose();
      reset();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
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
            onClick={handleClose}
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
            width={{ sm: "600px" }}
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
              <Typography variant="h5" color={"textPrimary"}>
                Adicionar Filme
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Título"
                        required
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.title?.message}
                      />
                    )}
                  />
                  <Controller
                    name="originalTitle"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Título Original"
                        required
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.originalTitle?.message}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Descrição"
                        type="multiline"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.description?.message}
                      />
                    )}
                  />
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Orçamento"
                        required
                        type="number"
                        name={field.name}
                        value={String(field.value || "")}
                        onChange={field.onChange}
                        errorMessage={errors.budget?.message}
                      />
                    )}
                  />
                  <Controller
                    name="releaseDate"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Data de Lançamento"
                        required
                        type="date"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.releaseDate?.message}
                      />
                    )}
                  />
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Duração (minutos)"
                        required
                        type="number"
                        name={field.name}
                        value={String(field.value || "")}
                        onChange={field.onChange}
                        errorMessage={errors.duration?.message}
                      />
                    )}
                  />
                  <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Gênero"
                        required
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        errorMessage={errors.genre?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={500} gutterBottom>
                    Imagem do Filme
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("imageUrl", file, { shouldValidate: true });
                      }
                    }}
                  />
                  {errors.imageUrl && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {errors.imageUrl.message as string}
                    </Typography>
                  )}
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={1} pt={2}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ width: "103px" }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "151px" }}
                    disabled={!isValid}
                  >
                    Adicionar
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};
