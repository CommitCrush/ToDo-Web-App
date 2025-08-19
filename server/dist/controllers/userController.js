import createHttpError from "http-errors";
import User from "../models/user.js";
import mongoose from "mongoose";
/*****
 * @Get All Users
 *
 **/
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        if (!users) {
            throw createHttpError(401, "Du wirst nicht zugelassen");
        }
        res.status(200).json({ message: "succesfull", users });
    }
    catch (error) {
        next(error);
    }
};
/*****
 * @Get One User by ID
 *
 **/
export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        //if (!mongoose.Types.ObjectId.isValid(id)) {
        if (!id) {
            throw createHttpError(404, "Benutzer nicht gefunden");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(404, "Ungültiger Benutzer-Id");
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            throw createHttpError(404, "Benutzer nicht gefunden");
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
/*****
 *
 * @UPDATE One User by ID
 *
 **/
export const updateUserById = async (req, res, next) => {
    //change any requests
    const userFields = [
        "username",
        "password",
        "email",
        "roles",
        "permissions",
    ];
    const id = req.params.id;
    try {
        if (!id)
            throw createHttpError(400, "Benutzer-Id nicht gefunden");
        if (!mongoose.Types.ObjectId.isValid(id))
            throw createHttpError(400, "Ungültiger Benutzer-Id");
        const user = await User.findById(id);
        if (!user)
            throw createHttpError(404, "Benutzer nicht gefunden");
        for (let field of userFields) {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        }
        await user.save();
        res.status(200).json({ message: "Profil wurde aktualisert", user });
    }
    catch (error) {
        next(error);
    }
};
/* ** */
//DELETE One User by ID
export const deleteUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw createHttpError(400, "Benutzer-Id gibt es nicht");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(400, "Ungültiger Benutzer-Id ");
        }
        await User.findByIdAndDelete(id);
        res
            .status(200)
            .json({ message: `Benutzer mit der id:${id} wurde gelöscht` });
    }
    catch (error) {
        next(error);
    }
};
