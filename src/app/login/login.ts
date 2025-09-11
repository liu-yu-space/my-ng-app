import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // 添加 FormsModule
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // 使用 signal 或普通属性
  username = signal('');
  password = signal('');
  errorMessage = signal('');

  // 注入 Router 服务
  constructor(private router: Router) {}

  // 处理登录逻辑
  onLogin() {
    console.log('登录信息：', this.username(), this.password());

    // 模拟登录验证
    if (this.username() === 'admin' && this.password() === '123456') {
      // 登录成功，跳转到 home 页面
      this.router.navigate(['/home']);
    } else {
      // 登录失败，显示错误信息
      this.errorMessage.set('用户名或密码错误');
    }
  }

  // 表单验证
  validate() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('请输入用户名和密码.');
    } else {
      this.errorMessage.set('');
      this.onLogin();
    }
  }
}
