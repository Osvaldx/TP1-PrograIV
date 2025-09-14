import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", component: Home },
            { path: "about", component: About }
        ]
    },
    {
        path: "auth",
        canActivate: [authGuard],
        children: [
            { path: "login", component: Login, },
            { path: "register", component: Register }
        ]
    },
    
    { path: "not-found", component: NotFound },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
