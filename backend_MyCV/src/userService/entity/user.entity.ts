import { Schema } from "mongoose";

export class User {
}

export const UserSchema = new Schema({
  name: String,
  age: Number,
  breed: String,
});
