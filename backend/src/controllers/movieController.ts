import { Request, Response } from "express";
import prisma from "../prisma/client";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";

declare global {
  namespace Express {
    interface Request {
      file?: {
        originalname: string;
        mimetype: string;
        buffer: Buffer;
      };
    }
  }
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export const listMovies: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { search, page = 1, duration, startDate, endDate, genre } = req.query;

  const pageSize = 10;
  const skip = (Number(page) - 1) * pageSize;

  try {
    const filters: any = {};

    if (search) {
      filters.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { originalTitle: { contains: String(search), mode: "insensitive" } },
      ];
    }

    if (duration) {
      filters.duration = { lte: Number(duration) };
    }

    if (startDate && endDate) {
      filters.releaseDate = {
        gte: new Date(String(startDate)),
        lte: new Date(String(endDate)),
      };
    }

    if (genre) {
      filters.genre = { contains: String(genre), mode: "insensitive" };
    }

    const movies: any = await prisma.movie.findMany({
      where: filters,
      skip,
      take: pageSize,
    });

    const totalMovies = await prisma.movie.count({ where: filters });

    return res.status(200).json({
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / pageSize),
      currentPage: Number(page),
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar filmes.", error });
  }
};

export const addOrEditMovie: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    id,
    title,
    originalTitle,
    description,
    budget,
    releaseDate,
    duration,
    genre,
  } = req.body;

  const file = req.file;

  try {
    let movie;

    let imageUrl = null;
    if (file) {
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `movies/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      imageUrl = uploadResult.Location;
    }

    if (id) {
      movie = await prisma.movie.update({
        where: { id: Number(id) },
        data: {
          title,
          originalTitle,
          description,
          budget,
          releaseDate,
          duration,
          genre,
          imageUrl,
        },
      });
    } else {
      movie = await prisma.movie.create({
        data: {
          title,
          originalTitle,
          description,
          budget,
          releaseDate,
          duration,
          genre,
          imageUrl,
        },
      });

      if (new Date(releaseDate) > new Date()) {
        const releaseDateObj = new Date(releaseDate);
        const delay = releaseDateObj.getTime() - Date.now();

        setTimeout(() => {
          transporter.sendMail({
            from: process.env.ETHEREAL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `Lançamento do filme: ${title}`,
            text: `O filme "${title}" será lançado hoje!`,
          });
        }, delay);
      }
    }

    return res.status(200).json({ message: "Filme salvo com sucesso!", movie });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao salvar filme.", error });
  }
};

export const getMovieDetails: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar detalhes do filme.", error });
  }
};
