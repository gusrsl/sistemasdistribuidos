import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
	{
		path: '',
		component: MenuPage,
		children: [
			{ path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
			{ path: 'clientes', loadChildren: () => import('../pages/clientes/clientes.module').then(m => m.ClientesPageModule) },
			{ path: 'servicios', loadChildren: () => import('../pages/servicios/servicios.module').then(m => m.ServiciosPageModule) },
			{ path: 'reservas', loadChildren: () => import('../pages/reservas/reservas.module').then(m => m.ReservasPageModule) },
			{path: 'publicaciones', loadChildren: () => import('../pages/publicaciones/publicaciones.module').then(m => m.PublicacionesPageModule) },
			{path: 'sugerencias', loadChildren: () => import('../pages/sugerencias/sugerencias.module').then(m => m.SugerenciasPageModule) },
			{path: 'perfil', loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule) },
			{path: 'singin', loadChildren: () => import('../pages/singin/singin.module').then(m => m.SinginPageModule) },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MenuPageRoutingModule { }
