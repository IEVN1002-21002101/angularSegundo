import { Routes } from "@angular/router";
 
export default [
    {
        path: 'zodiaco',
        loadComponent: () => import('./zoodiaco.component'),
    },
    {
        path: '**',  // Usar '**' en lugar de '*'
        redirectTo: '' // O mejor, puedes usar '/'
    },
] as Routes;
