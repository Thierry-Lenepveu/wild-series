import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();

  res.json(categoriesFromDB);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const categoryFromDB = await categoryRepository.read(parsedId);

  if (categoryFromDB != null) {
    res.json(categoryFromDB);
  } else {
    res.sendStatus(404);
  }
};

const edit: RequestHandler = async (req, res) => {
  // Update a specific category based on the provided ID
  const category = {
    id: Number(req.params.id),
    name: req.body.name,
  };

  const affectedRows = await categoryRepository.update(category);

  if (affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
};

const add: RequestHandler = async (req, res) => {
  const newCategory = {
    name: req.body.name,
  };

  const insertId = await categoryRepository.create(newCategory);
  res.status(201).json({ insertId });
};

const destroy: RequestHandler = async (req, res) => {
  const categoryId = Number(req.params.id);

  await categoryRepository.delete(categoryId);

  res.sendStatus(204);
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name } = req.body;
  if (name == null) {
    errors.push({ field: "name", message: "The field is required" });
  }

  if (name.length > 25) {
    errors.push({
      field: "name",
      message: "Should contain less than 255 characters",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Export them to import them somewhere else

export default {
  /* Here you export */
  browse,
  read,
  add,
  edit,
  destroy,
  validate,
};
