import React from "react";

export const getUser = async (req, res, next) => {
  try {
    // code
    res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
