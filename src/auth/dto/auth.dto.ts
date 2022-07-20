export class LoginDto {
  email: string
  password: string
}

export class ResetPasswordDto {
  password: string
  token: string
}