import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { homeGuard } from './guards/home-guard';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        canActivate: [homeGuard],
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
    }
];
