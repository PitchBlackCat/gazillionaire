import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
  path: 'main-menu',
  loadChildren: () => import('./pages/main-menu/main-menu.module').then(m => m.MainMenuModule)
},
  { path: 'tv', loadChildren: () => import('./pages/tv/tv.module').then(m => m.TvModule) },
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
  { path: 'dev', loadChildren: () => import('./pages/dev/dev.module').then(m => m.DevModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
