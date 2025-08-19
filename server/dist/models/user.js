import { Schema, model } from "mongoose";
import validator from "validator";
//import bcrypt from "bcryptjs";
import { hash } from "bcrypt-ts";
//1. Schema erstellen
export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // nur einmal in unserer DB
        validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.v} ist not valid`,
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => 
            //// Wenn Passwort bereits gehasht ist (z. B. beim Update), überspringen
            //if (v.startsWith("$2b$")) return true;
            validator.isStrongPassword(v, {
                minLength: 10,
                minNumbers: 2,
                minSymbols: 2,
                minUppercase: 2,
                minLowercase: 2,
            }),
            message: (props) => `Password is weak!`,
        },
    },
    verified: {
        type: Date,
    },
    roles: {
        /* type: [
          {
            type: String,
            enum: ["USER", "ADMIN", "VIEWER"],
          },
        ],
        default: ["USER"], */
        type: [String],
        enum: ["USER", "ADMIN", "VIEWER"],
        default: ["USER"],
    },
    permissions: [
        {
            type: String,
            enum: ["CREATE_USER", "VIEWER_USER", "UPDATE_USER", "DELETE_USER"],
        },
    ],
});
//user.ts
// Passwort und interne Felder beim JSON-Ausgabe entfernen
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    delete obj.verificationToken;
    return obj;
};
// mongoose definiert verschiedene Events, wo man eine Callback-Funktion hinzufügen kann//#### Bereinigung
userSchema.pre("save", async function (next) {
    this.email = validator.trim(this.email);
    this.email =
        validator.normalizeEmail(this.email, {
            // Nur gmail,  nicht die dots löschen bei den E-mails
            gmail_remove_dots: false,
        }) || this.email;
    //Falls das Password geändert wird
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
    next();
});
//3. Modell erstellen
const User = model("User", userSchema);
//4. export
export default User;
