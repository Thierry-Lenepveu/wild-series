import type { RequestHandler } from "express";

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

const browse: RequestHandler = (req, res) => {
  res.json(categories);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const program = categories.find((category) => category.id === parsedId);

  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default {
  /* Here you export */
  browse,
  read,
};
