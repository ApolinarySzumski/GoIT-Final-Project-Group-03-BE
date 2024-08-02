import React from 'react'

export const getMyFavoriteRecipes = async (req, res, next) => {
  try {
    // code
    res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
  )
}
