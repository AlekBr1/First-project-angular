// auth.guard.ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  perfil: string;
}

export const authUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  // Verificar se há token e se o token não expirou
  if (token) {
    try {
      // Decodificando o token JWT
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);

      // Verificar a expiração do token (você pode ajustar conforme seu JWT)
      const expirationDate = new Date(decodedToken.exp * 1000);
      if (expirationDate < new Date() || decodedToken.perfil !== "user") {
        // Token expirado, redireciona para login
        router.navigate(["login"]);
        return false;
      }
      return true;
      // Token válido, prosseguir com a navegação
    } catch (error) {
      console.error("Token inválido ou corrompido", error);
      router.navigate(["login"]);
      return false;
    }
  }
  // Sem token, redireciona para login
  router.navigate(["login"]);
  return false;
};
