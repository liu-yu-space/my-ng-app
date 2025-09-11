import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router) {}

  // 退出登录方法
  logout() {
    // 这里可以添加清除用户数据的逻辑
    // 例如：清除 localStorage、token 等

    // 跳转到登录页面
    this.router.navigate(['/login']);
  }
}
