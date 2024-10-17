import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/features/auth.routes')
    },
    {
        path: 'zodiacos',
        loadChildren: () => import('./formulario/zoodiaco/zod.routes')
    },
    {
        path: '**',  // Cambiado '*' por '**'
        redirectTo: '' // O mejor, '/'
    },
];
