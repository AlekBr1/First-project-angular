import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { authUserGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authUserGuard],
  },
  { path: "**", redirectTo: "login" },
];
