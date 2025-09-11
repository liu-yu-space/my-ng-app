import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 默认重定向到 home
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '/home' } // 通配符路由，处理未匹配的路径
];
