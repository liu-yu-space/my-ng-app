# Angular 基础面试题集

## 第一部分：Angular 基础概念 (1-5题)

### 1. 什么是 Angular？它与 AngularJS 有什么区别？

<details>
<summary>点击查看答案</summary>

**Angular** 是一个基于 TypeScript 的开源前端框架，用于构建单页应用程序(SPA)。

**主要区别：**
- **语言**：AngularJS 使用 JavaScript，Angular 使用 TypeScript
- **架构**：AngularJS 基于 MVC，Angular 基于组件和服务
- **性能**：Angular 有更好的性能和移动端支持
- **版本**：AngularJS 是 1.x 版本，Angular 是 2+ 版本

</details>

---

### 2. 解释 Angular 中的组件(Component)是什么？

<details>
<summary>点击查看答案</summary>

**组件**是 Angular 应用的基本构建块，控制屏幕上的一块区域（视图）。

**组件包含：**
```typescript
@Component({
  selector: 'app-example',    // 组件选择器
  templateUrl: './example.html', // 模板文件
  styleUrl: './example.css'   // 样式文件
})
export class ExampleComponent {
  // 组件逻辑
}
```

**特点：**
- 包含 HTML 模板、CSS 样式和 TypeScript 逻辑
- 可以嵌套和复用
- 有自己的生命周期

</details>

---

### 3. 什么是数据绑定？Angular 中有哪些类型的数据绑定？

<details>
<summary>点击查看答案</summary>

**数据绑定**是连接组件数据和视图的机制。

**四种类型：**

1. **插值绑定（单向）**：`{{ value }}`
2. **属性绑定（单向）**：`[property]="value"`
3. **事件绑定（单向）**：`(event)="handler()"`
4. **双向绑定**：`[(ngModel)]="value"`

```html
<!-- 示例 -->
<h1>{{ title }}</h1>                    <!-- 插值 -->
<img [src]="imageUrl">                  <!-- 属性绑定 -->
<button (click)="onClick()">点击</button> <!-- 事件绑定 -->
<input [(ngModel)]="name">              <!-- 双向绑定 -->
```

</details>

---

### 4. 解释 Angular 中的指令(Directive)，有哪些类型？

<details>
<summary>点击查看答案</summary>

**指令**是用来扩展 HTML 元素功能的类。

**三种类型：**

1. **组件指令**：有模板的指令（组件就是特殊的指令）
2. **结构指令**：改变 DOM 结构
   ```html
   <div *ngIf="show">条件显示</div>
   <li *ngFor="let item of items">{{ item }}</li>
   ```
3. **属性指令**：改变元素外观或行为
   ```html
   <div [ngClass]="{'active': isActive}">样式控制</div>
   <div [ngStyle]="{'color': textColor}">内联样式</div>
   ```

</details>

---

### 5. 什么是服务(Service)？如何创建和使用服务？

<details>
<summary>点击查看答案</summary>

**服务**是包含业务逻辑的类，用于在组件间共享数据和功能。

**创建服务：**
```typescript
@Injectable({
  providedIn: 'root'  // 根级注入
})
export class DataService {
  getData() {
    return 'some data';
  }
}
```

**使用服务：**
```typescript
export class MyComponent {
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    const data = this.dataService.getData();
  }
}
```

</details>

---

## 第二部分：组件交互 (6-10题)

### 6. 如何在父子组件间传递数据？

<details>
<summary>点击查看答案</summary>

**父传子 - 使用 @Input()：**
```typescript
// 子组件
export class ChildComponent {
  @Input() message: string = '';
}
```
```html
<!-- 父组件模板 -->
<app-child [message]="parentMessage"></app-child>
```

**子传父 - 使用 @Output()：**
```typescript
// 子组件
export class ChildComponent {
  @Output() dataChange = new EventEmitter<string>();
  
  sendData() {
    this.dataChange.emit('data from child');
  }
}
```
```html
<!-- 父组件模板 -->
<app-child (dataChange)="onDataChange($event)"></app-child>
```

</details>

---

### 7. 什么是生命周期钩子？常用的有哪些？

<details>
<summary>点击查看答案</summary>

**生命周期钩子**是 Angular 在组件生命周期的特定时刻调用的方法。

**常用钩子：**
- **ngOnInit**：组件初始化后调用（最常用）
- **ngOnChanges**：输入属性变化时调用
- **ngOnDestroy**：组件销毁前调用（清理工作）
- **ngAfterViewInit**：视图初始化后调用

```typescript
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('组件初始化');
  }
  
  ngOnDestroy() {
    console.log('组件销毁');
  }
}
```

</details>

---

### 8. Angular 中的模板引用变量是什么？如何使用？

<details>
<summary>点击查看答案</summary>

**模板引用变量**用 `#` 声明，可以引用模板中的元素或组件。

**使用示例：**
```html
<!-- 引用DOM元素 -->
<input #nameInput type="text">
<button (click)="showValue(nameInput.value)">显示值</button>

<!-- 引用组件 -->
<app-child #childComponent></app-child>
<button (click)="childComponent.doSomething()">调用子组件方法</button>
```

**在组件中使用 @ViewChild：**
```typescript
export class ParentComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('childComponent') child!: ChildComponent;
}
```

</details>

---

### 9. 什么是内容投影(Content Projection)？

<details>
<summary>点击查看答案</summary>

**内容投影**允许将外部内容插入到组件模板中的指定位置。

**基本用法：**
```typescript
// 卡片组件
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>  <!-- 投影插槽 -->
    </div>
  `
})
export class CardComponent {}
```

**使用：**
```html
<app-card>
  <h2>标题</h2>
  <p>这些内容会被投影到卡片中</p>
</app-card>
```

**多插槽投影：**
```html
<!-- 组件模板 -->
<ng-content select="[slot=header]"></ng-content>
<ng-content select="[slot=footer]"></ng-content>

<!-- 使用 -->
<app-card>
  <div slot="header">头部内容</div>
  <div slot="footer">底部内容</div>
</app-card>
```

</details>

---

### 10. 解释 Angular 中的管道(Pipe)是什么？

<details>
<summary>点击查看答案</summary>

**管道**用于在模板中转换数据的显示格式。

**内置管道：**
```html
{{ name | uppercase }}              <!-- 大写 -->
{{ price | currency:'CNY' }}        <!-- 货币格式 -->
{{ birthday | date:'yyyy-MM-dd' }}  <!-- 日期格式 -->
{{ items | json }}                  <!-- JSON格式 -->
```

**自定义管道：**
```typescript
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

**使用：**
```html
{{ 'hello' | reverse }}  <!-- 输出：olleh -->
```

</details>

---

## 第三部分：路由和表单 (11-15题)

### 11. Angular 路由的基本概念是什么？如何配置路由？

<details>
<summary>点击查看答案</summary>

**路由**允许在不同组件（页面）间导航。

**配置路由：**
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', component: NotFoundComponent }
];
```

**在模板中使用：**
```html
<router-outlet></router-outlet>  <!-- 路由出口 -->
<a routerLink="/home">首页</a>   <!-- 路由链接 -->
<a [routerLink]="['/user', userId]">用户</a>
```

**编程式导航：**
```typescript
constructor(private router: Router) {}

navigateToHome() {
  this.router.navigate(['/home']);
}
```

</details>

---

### 12. 什么是路由守卫？有哪些类型？

<details>
<summary>点击查看答案</summary>

**路由守卫**控制路由的访问权限。

**守卫类型：**
- **CanActivate**：是否可以进入路由
- **CanDeactivate**：是否可以离开路由
- **CanLoad**：是否可以加载模块

**示例：**
```typescript
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// 在路由中使用
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
```

</details>

---

### 13. Angular 中有哪些表单处理方式？

<details>
<summary>点击查看答案</summary>

**两种表单处理方式：**

**1. 模板驱动表单**：
```html
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <input name="username" [(ngModel)]="user.username" required>
  <button type="submit" [disabled]="!userForm.valid">提交</button>
</form>
```

**2. 响应式表单（推荐）**：
```typescript
export class UserComponent {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <input formControlName="username">
  <input formControlName="email">
  <button [disabled]="!userForm.valid">提交</button>
</form>
```

</details>

---

### 14. 什么是表单验证？如何实现？

<details>
<summary>点击查看答案</summary>

**表单验证**确保用户输入的数据符合要求。

**内置验证器：**
```typescript
userForm = new FormGroup({
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ])
});
```

**自定义验证器：**
```typescript
// 自定义验证函数
function forbiddenNameValidator(control: AbstractControl) {
  const forbidden = /admin/.test(control.value);
  return forbidden ? { forbiddenName: true } : null;
}

// 使用
username: new FormControl('', [Validators.required, forbiddenNameValidator])
```

**显示错误信息：**
```html
<input formControlName="username">
<div *ngIf="userForm.get('username')?.invalid && userForm.get('username')?.touched">
  用户名不能为空
</div>
```

</details>

---

### 15. 什么是 HttpClient？如何发送 HTTP 请求？

<details>
<summary>点击查看答案</summary>

**HttpClient** 是 Angular 提供的 HTTP 客户端服务。

**基本使用：**
```typescript
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  
  // GET 请求
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
  
  // POST 请求
  createUser(user: User) {
    return this.http.post<User>('/api/users', user);
  }
  
  // PUT 请求
  updateUser(id: number, user: User) {
    return this.http.put<User>(`/api/users/${id}`, user);
  }
  
  // DELETE 请求
  deleteUser(id: number) {
    return this.http.delete(`/api/users/${id}`);
  }
}
```

**在组件中使用：**
```typescript
export class UserComponent {
  users: User[] = [];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }
}
```

</details>

---

## 第四部分：高级概念 (16-20题)

### 16. 什么是依赖注入？Angular 中如何使用？

<details>
<summary>点击查看答案</summary>

**依赖注入(DI)** 是一种设计模式，允许类从外部获取依赖，而不是自己创建。

**提供服务：**
```typescript
@Injectable({
  providedIn: 'root'  // 在根级别提供
})
export class DataService {}
```

**注入使用：**
```typescript
// 构造函数注入
export class MyComponent {
  constructor(private dataService: DataService) {}
}

// 使用 inject() 函数
export class MyComponent {
  private dataService = inject(DataService);
}
```

**不同注入级别：**
- `providedIn: 'root'` - 根级单例
- 组件级别 - 每个组件实例独立
- 模块级别 - 模块范围内单例

</details>

---

### 17. 什么是 Observable？与 Promise 有什么区别？

<details>
<summary>点击查看答案</summary>

**Observable** 是处理异步数据流的对象。

**与 Promise 的区别：**

| 特性 | Promise | Observable |
|------|---------|------------|
| 数据量 | 单个值 | 多个值 |
| 执行时机 | 立即执行 | 懒执行（订阅时） |
| 取消 | 不可取消 | 可取消 |
| 操作符 | 有限 | 丰富的操作符 |

**使用示例：**
```typescript
// Observable
this.http.get('/api/data').subscribe(
  data => console.log(data),
  error => console.error(error)
);

// 使用操作符
this.http.get('/api/users').pipe(
  map(users => users.filter(u => u.active)),
  tap(users => console.log('Active users:', users))
).subscribe(activeUsers => {
  this.activeUsers = activeUsers;
});
```

</details>

---

### 18. 什么是 Signals？它解决了什么问题？

<details>
<summary>点击查看答案</summary>

**Signals** 是 Angular 16+ 引入的响应式原语，用于更细粒度的状态管理。

**基本使用：**
```typescript
export class CounterComponent {
  count = signal(0);              // 创建 signal
  doubleCount = computed(() => this.count() * 2);  // 计算属性
  
  increment() {
    this.count.set(this.count() + 1);  // 设置值
    // 或者
    this.count.update(val => val + 1);  // 更新值
  }
}
```

**解决的问题：**
- **性能优化**：只更新真正变化的部分
- **简化变更检测**：不需要 Zone.js
- **类型安全**：完整的 TypeScript 支持
- **组合性**：computed 信号自动追踪依赖

**在模板中使用：**
```html
<div>计数: {{ count() }}</div>
<div>双倍: {{ doubleCount() }}</div>
<button (click)="increment()">增加</button>
```

</details>

---

### 19. 什么是 Standalone Components？

<details>
<summary>点击查看答案</summary>

**独立组件**不需要在 NgModule 中声明，可以直接使用。

**创建独立组件：**
```typescript
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],  // 直接导入需要的模块
  template: `
    <div>
      <input [(ngModel)]="name">
      <p *ngIf="name">Hello {{ name }}!</p>
    </div>
  `
})
export class UserComponent {
  name = '';
}
```

**优势：**
- **简化架构**：不需要复杂的模块系统
- **更好的树摇优化**：只导入真正使用的依赖
- **更好的开发体验**：减少样板代码
- **渐进式采用**：可以与传统组件混用

**启动独立应用：**
```typescript
// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    // 全局提供者
  ]
});
```

</details>

---

### 20. Angular 的性能优化有哪些常用策略？

<details>
<summary>点击查看答案</summary>

**常用性能优化策略：**

**1. 变更检测优化：**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {}
```

**2. TrackBy 函数：**
```html
<li *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
```
```typescript
trackByFn(index: number, item: any) {
  return item.id;  // 使用唯一标识
}
```

**3. 懒加载：**
```typescript
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];
```

**4. 使用 Async 管道：**
```html
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

**5. 图片优化：**
```html
<img [src]="imageUrl" loading="lazy" [ngOptimizedImage]="imageUrl">
```

**6. 使用 Signals（新特性）：**
```typescript
// 更细粒度的响应式更新
count = signal(0);
computed(() => this.count() * 2);
```

</details>

---

## 学习建议

1. **逐题练习**：每道题都要动手实践
2. **查阅文档**：遇到不理解的概念查阅官方文档
3. **创建示例**：为每个概念创建小的示例项目
4. **定期复习**：隔一段时间重新做一遍题目

**祝你面试顺利！🚀**
