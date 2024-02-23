import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { PermisoPara } from "./roles.decorator";

// ESTO ES OPCIONAR SI DESEAS

export function AUTENTICACION_PARA_EL(role: Role) {
  return applyDecorators(PermisoPara(role), UseGuards(AuthGuard, RolesGuard));
}
