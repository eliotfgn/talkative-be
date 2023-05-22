import { IsEmail, Length } from "class-validator";

export class UserDto {
  id?: string;
  
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  firstname: string;

  lastname: string;

  profilePic?: string;

  createdAt?: Date;

  updatedAt?: Date;


  constructor(username: string, email: string, password: string, firstname: string, lastname: string, profilePic?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.profilePic = profilePic;
    this.createdAt = new Date();
    this.updatedAt = new Date()
  }
}