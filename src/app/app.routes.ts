import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';

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
    
    { path: "not-found", loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
