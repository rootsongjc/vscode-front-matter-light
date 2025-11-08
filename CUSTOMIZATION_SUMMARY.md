# Front Matter Extension 简化定制总结

## 已应用的修改

已对 `src/extension.ts` 进行了以下禁用修改：

### 1. 禁用内容目录扫描 (第 84-86 行)
```typescript
// DISABLED: Not scanning registered folders
// PagesListener.startWatchers();
```
**效果**: Extension 不再自动扫描配置的内容目录

---

### 2. 禁用 Dashboard 初始化 (第 91-94 行)
```typescript
// DISABLED: Dashboard functionality not needed
// Dashboard.init();
// Dashboard.registerCommands();
```
**效果**: Dashboard 完全禁用，不加载相关 UI

---

### 3. 禁用首次启动的 Dashboard 打开 (第 103-106 行)
```typescript
// DISABLED: Don't open dashboard on first install
// if (!extension.getVersion().usedVersion) {
//   vscode.commands.executeCommand(COMMAND_NAME.dashboard);
// }
```
**效果**: 首次安装后不自动打开 Dashboard

---

### 4. 禁用状态栏 Dashboard 命令 (第 154 行)
```typescript
// DISABLED: Don't link status bar to dashboard
// fmStatusBarItem.command = COMMAND_NAME.dashboard;
```
**效果**: 状态栏点击不再打开 Dashboard（仅显示版本号）

---

### 5. 禁用文件保存监听 (第 188-189 行)
```typescript
// DISABLED: Not tracking file changes
// subscriptions.push(PagesListener.saveFileWatcher());
```
**效果**: 不再追踪文件保存事件（节省资源）

---

### 6. 禁用后台内容解析 (第 233-235 线)
```typescript
// DISABLED: Background content parsing not needed
// DashboardSettings.get();
// PagesParser.start();
```
**效果**: 后台不再进行内容解析和索引

---

## 保留的功能 ✅

- **YAML/Front Matter 解析**: 完全保留，所有 FM 解析功能正常
- **自定义脚本**: 脚本执行和扩展功能完全保留
- **设置管理**: 所有配置命令保留 (`Settings.registerCommands()`)
- **多语言支持**: i18n 功能保留
- **编辑器面板**: PanelProvider 仍然注册，可展示编辑器信息
- **模板和内容类型**: 相关命令保留
- **WYSIWYG 编辑**: 富文本编辑支持保留
- **Git 集成**: GitListener 保留

---

## 禁用的功能 ❌

- Dashboard 内容浏览界面
- 自动目录扫描和监听
- 内容创建向导
- 文件系统变化实时追踪
- 后台内容索引和解析

---

## 使用编译

### 开发模式（推荐测试）
```bash
npm run dev:ext
# 在 VS Code 中按 F5 启动调试会话
```

### 生产编译
```bash
npm run vscode:prepublish
```

### 仅编译扩展
```bash
npm run build:ext
```

---

## 验证修改

安装或重新加载扩展后：

1. ✓ 不会自动扫描已注册的文件夹
2. ✓ 不会有 Dashboard 相关的 UI 或命令
3. ✓ 自定义脚本功能正常工作
4. ✓ YAML front matter 解析正常
5. ✓ 设置面板功能正常

---

## 恢复功能

如需恢复任何功能，只需在 `src/extension.ts` 中取消注释相应的代码行。

例如，恢复 Dashboard：
```typescript
Dashboard.init();
Dashboard.registerCommands();
```

---

## 后续优化选项

如需进一步优化，可以：

1. 从 `package.json` 的 `contributes` 中删除 Dashboard 视图定义
2. 从导入中移除未使用的命令模块
3. 删除不需要的 WebView 相关代码

当前做法通过注释保持最大灵活性，易于恢复。
