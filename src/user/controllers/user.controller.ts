import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();
      if (data.length === 0) {
        this.httpResponse.NotFound(res, "No existen datos");
      } else {
        this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      this.httpResponse.Error(res, e);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);
      if (!data) {
        this.httpResponse.NotFound(res, "No se encontró el usuario");
      } else {
        this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      this.httpResponse.Error(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res, e);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body
      );
      if (!data.affected) {
        this.httpResponse.NotFound(res, "Error al actualizar el usuario");
      } else {
        this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      this.httpResponse.Error(res, e);
    }
  }

  async daleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, "No se encontró el usuario");
      } else {
        this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      this.httpResponse.Error(res, e);
    }
  }

  async getUserWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelation(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
