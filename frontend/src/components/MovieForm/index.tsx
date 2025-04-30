import { Box, Button, IconButton, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../FormInput";
import { useSnackbar } from "notistack";
import movieSchema from "./schema";
import { EditFormMovie, MovieFormData } from "../../utils/moviesInterface";
import { useEffect } from "react";
import Close from "../Icons/Close";
import { movieService } from "../../services/movieServices";

interface AddMovieDrawerProps {
  open: boolean;
  movieToEdit?: MovieFormData | null;
  movieId?: number;
  onClose: () => void;
  onMovieAdded: () => void;
}

export const AddMovieDrawer = ({
  open,
  movieToEdit,
  movieId,
  onClose,
  onMovieAdded,
}: AddMovieDrawerProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(movieSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (movieToEdit) {
      reset({
        ...movieToEdit,
        releaseDate: movieToEdit.releaseDate
          ? new Date(movieToEdit.releaseDate)
          : undefined,
      });
    } else {
      reset();
    }
  }, [movieToEdit, reset]);

  const onSubmit = async (formData: MovieFormData) => {
    const data: MovieFormData = {
      ...formData,
      tagline: formData.tagline ?? undefined,
      youtubeUrl: formData.youtubeUrl ?? undefined,
      imageUrl: formData.imageUrl ?? undefined,
    };

    const editData: EditFormMovie = {
      ...formData,
      id: movieId,
      tagline: formData.tagline ?? undefined,
      youtubeUrl: formData.youtubeUrl ?? undefined,
      imageUrl: formData.imageUrl ?? undefined,
    };

    try {
      if (movieToEdit && movieId) {
        await movieService.editMovie(editData);
        enqueueSnackbar("Filme atualizado com sucesso!", {
          variant: "success",
        });
      } else {
        await movieService.addMovie(data);
        enqueueSnackbar("Filme adicionado com sucesso!", {
          variant: "success",
        });
      }

      onClose();
      onMovieAdded();
      reset();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Erro ao salvar o filme. Tente novamente.", {
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
            sx={{ backdropFilter: "blur(5px)" }}
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
            width={{ sm: "500px" }}
            bgcolor="background.paper"
            zIndex={1300}
            display="flex"
            flexDirection="column"
            p={2}
            sx={{ overflow: "auto" }}
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h5">Adicionar Filme</Typography>
              <IconButton onClick={handleClose} color="primary">
                <Close />
              </IconButton>
            </Box>

            <form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Título"
                          name={field.name}
                          placeholder="Digite o nome do filme"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.title?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <Controller
                      name="originalTitle"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Título Original"
                          name={field.name}
                          placeholder="Nome original do filme"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.originalTitle?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Descrição"
                      name={field.name}
                      placeholder="Descrição detalhada do filme"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      type="multiline"
                      errorMessage={errors?.description?.message}
                    />
                  )}
                />

                <Controller
                  name="tagline"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Tagline"
                      name={field.name}
                      placeholder="Frase de destaque do filme"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      errorMessage={errors?.tagline?.message}
                    />
                  )}
                />

                {/* Linha: Orçamento / Receita */}
                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Orçamento"
                          name={field.name}
                          placeholder="Ex: 10000000"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.budget?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <Controller
                      name="revenue"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Receita"
                          name={field.name}
                          placeholder="Ex: 50000000"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.revenue?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="popularity"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Popularidade"
                          name={field.name}
                          placeholder="Ex: 8.5"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.popularity?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <Controller
                      name="voteCount"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Número de Votos"
                          name={field.name}
                          placeholder="Ex: 2000"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.voteCount?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="language"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Idioma"
                          name={field.name}
                          placeholder="Ex: en, pt-BR"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.language?.message}
                        />
                      )}
                    />
                  </Box>

                  <Box flex={1}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Status"
                          name={field.name}
                          placeholder="Ex: Lançado, Em produção"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.status?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="releaseDate"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Data de Lançamento"
                          name={field.name}
                          type="date"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.releaseDate?.message}
                        />
                      )}
                    />
                  </Box>

                  <Box flex={1}>
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Duração"
                          name={field.name}
                          placeholder="Duração em minutos"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.duration?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Box flex={1}>
                    <Controller
                      name="genre"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Gêneros"
                          placeholder={"Ex: Animação, Ação"}
                          name={field.name}
                          value={field.value ?? []}
                          onChange={field.onChange}
                          errorMessage={errors?.genre?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <Controller
                      name="youtubeUrl"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="URL do YouTube"
                          name={field.name}
                          placeholder="Link do trailer"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          errorMessage={errors?.youtubeUrl?.message}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box>
                  <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="URL da Imagem"
                        placeholder={"URL da capa do Filme"}
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={handleSubmit(onSubmit)}
                    sx={{ minWidth: "182px" }}
                  >
                    {movieToEdit ? "Editar Filme" : "Adicionar Filme"}
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
