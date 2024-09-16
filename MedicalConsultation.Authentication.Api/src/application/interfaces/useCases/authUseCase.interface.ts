import { ResponseModel } from "../../models/responseModel";

export interface IAuthUseCase {
  login(user: string, password: string): Promise<ResponseModel>;
  validate(token: string): Promise<ResponseModel>;
}