export class EmailExistsError extends Error {
  email: string;
  message: string;

  constructor(email: string, message: string) {
    super(`User with email ${email} already exists.`);
    this.email = email;
    this.message = message;
  }

  public getEmail(): string {
    return this.email;
  }

  public getMessage(): string {
    return this.message;
  }
}

export class UsernameExistsError extends Error {
  username: string;
  message: string;

  constructor(username: string, message: string) {
    super(`User with username ${username} already exists.`);

    this.username = username;
    this.message = message;
  }

  public getUsername(): string {
    return this.username;
  }

  public getMessage(): string {
    return this.message;
  }
}
