import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.js";
import { compare } from "bcrypt-ts";
import { createToken } from "../utils/jwt.js";

import { DEFAULT_ROLE, DEFAULT_PERMISSIONS } from "../utils/constants.js";
import { JwtPayload } from "../types/jwt.js";

//einen neuen User registrieren/erstellen
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Benutzer, email und Passwort aus dem Body holen
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Benutzername, Email oder Password fehlt");
    }

    //ist der E-mail bereits registriert?
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw createHttpError(404, "Diese Email ist bereist registriert");
    }

    const newUser = await User.create({
      username,
      password,
      email,
      permissions: DEFAULT_PERMISSIONS,
      roles: DEFAULT_ROLE,
    });
    console.log("newUser", newUser);

    res
      .status(201)
      .json({ messageg: "Ein neue Benutzer wurde angelegt", newUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the login post request.
 * @param {import('express').Request} req - The request object.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const loggedUser = await User.findOne({ email });

    // Suchen nach einem User
    if (!loggedUser) {
      throw createHttpError(401, "Username/Email ist nicht vorhanden");
    }

    //Prüfung des Passwortes,
    const comparePassword = await compare(password, loggedUser.password);
    if (!comparePassword) {
      throw createHttpError(401, "Email oder Password ist falsch!");
    }

    // Erstellen ein JWT und  an den req.user schicken
    const token = createToken({
      _id: loggedUser._id.toString(),
      email: loggedUser.email,
    }) as JwtPayload;

    if (!token) {
      throw createHttpError(404, "Ungültiger Kredential");
    }
    // Token an den Frontend in einer Cookie schicken
    // Access Token + Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 d
    });

    //Antwort senden
    res.status(200).json({ message: "Login erfolgreich", loggedUser });
  } catch (error) {
    next(error);
  }
};

//
export const getOwnProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      throw createHttpError(401, "Benutzer ist nicht eingelogt");
    }

    const loggedUser = await User.findById(currentUser._id).select("-password");
    console.log("loggedUser", loggedUser);

    if (!loggedUser) {
      throw createHttpError(404, "Benutzer wurde nicht gefunden");
    }

    res.status(200).json(loggedUser);
  } catch (error) {
    next(error);
  }
};

export const updateOwnProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  try {
    if (!req.user) {
      throw createHttpError(401, "nicht eingeloggt");
    }

    const id = req.user._id;

    const currentUser = await User.findById(id);
    if (!currentUser) {
      throw createHttpError(401, "Benutzer ist nicht eingeloggt");
    }

    if (username) currentUser.username = username;
    if (email) currentUser.email = email;
    if (password) currentUser.password = password;

    await currentUser.save();
    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 d
    });
    res.status(200).json({ message: " du bist ausgeloggt" });
  } catch (error) {
    next(error);
  }
};
