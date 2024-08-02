import React from 'react'

export const getRecipeById = = async (req, res, next) => {
  try {
    // code
    res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
