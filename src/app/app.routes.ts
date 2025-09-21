import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { GamesLayout } from './layouts/games-layout/games-layout';
import { gamesGuard } from './guards/games-guard';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", loadComponent: () => import('./pages/home/home').then(m => m.Home) },
            { path: "about", loadComponent: () => import('./pages/about/about').then(m => m.About) }
        ]
    },
    {
        path: "auth",
        canActivate: [authGuard],
        children: [
            { path: "login", loadComponent: () => import('./pages/auth/login/login').then(m => m.Login), },
            { path: "register", loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) }
        ]
    },
    {
        path: "games",
        component: GamesLayout,
        canMatch: [gamesGuard],
        children: [
            { path: "ahorcado", loadComponent: () => import('./pages/games/ahorcado/ahorcado').then(m => m.Ahorcado) },
            { path: "mayoromenor", loadComponent: () => import('./pages/games/mayoromenor/mayoromenor').then(m => m.Mayoromenor) },
            { path: "preguntados", loadComponent: () => import('./pages/games/preguntados/preguntados').then(m => m.Preguntados) },
            { path: "snake", loadComponent: () => import('./pages/games/snakegame/snakegame').then(m => m.Snakegame) }
        ]
    },
    
    { path: "not-found", loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
