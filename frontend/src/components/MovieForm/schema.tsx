// src/validations/movieSchema.ts
import * as Yup from "yup";

const movieSchema = Yup.object().shape({
  id: Yup.string().optional(),
  title: Yup.string().required("Título é obrigatório"),
  originalTitle: Yup.string().required("Título original é obrigatório"),
  description: Yup.string().required("Descrição é obrigatória"),
  tagline: Yup.string().nullable(),
  budget: Yup.number().required("Orçamento é obrigatório").min(0),
  revenue: Yup.number().required("Receita é obrigatória").min(0),
  popularity: Yup.number().required("Popularidade é obrigatória").min(0),
  voteCount: Yup.number().required("Número de votos é obrigatório").min(0),
  language: Yup.string().required("Idioma é obrigatório"),
  status: Yup.string().required("Status é obrigatório"),
  releaseDate: Yup.date()
    .required("Data de lançamento é obrigatória")
    .min(new Date(), "Data de lançamento não pode ser no passado"),
  duration: Yup.number().required("Duração é obrigatória").min(1),
  genre: Yup.string().required("Gênero é obrigatório"),
  youtubeUrl: Yup.string().url("URL inválida").nullable(),
  imageUrl: Yup.mixed().required("Imagem é obrigatória"),
});

export default movieSchema;
