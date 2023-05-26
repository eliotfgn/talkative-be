export class EmailExistsError extends Error {
  email: string;

  constructor(email: string) {
    super(`User with email ${email} already exists.`);
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }
}

export class UsernameExistsError extends Error {
  username: string;

  constructor(username: string) {
    super(`User with username ${username} already exists.`);

    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }
}
