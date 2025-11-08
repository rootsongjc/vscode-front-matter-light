# 简化 Front Matter Extension 指南

此指南将帮助你禁用内容管理和 Dashboard 功能，只保留 YAML 解析、设置和自定义脚本功能。

## 修改步骤

### 1. 禁用内容目录扫描 (src/extension.ts)

找到第 86 行，注释掉目录监听：

```typescript
// 禁用内容目录监听和扫描
// PagesListener.startWatchers();
```

同时注释掉第 185 行的文件保存监听（可选，如果不需要追踪内容变化）：

```typescript
// 禁用文件保存监听
// subscriptions.push(PagesListener.saveFileWatcher());
```

### 2. 禁用 Dashboard 功能 (src/extension.ts)

注释掉第 91-92 行：

```typescript
// 禁用 Dashboard 初始化
// Dashboard.init();
// Dashboard.registerCommands();
```

注释掉第 101-103 行（首次安装时的 Dashboard 打开）：

```typescript
// 首次安装时不打开 Dashboard
// if (!extension.getVersion().usedVersion) {
//   vscode.commands.executeCommand(COMMAND_NAME.dashboard);
// }
```

注释掉第 152 行（状态栏命令）：

```typescript
// fmStatusBarItem.command = COMMAND_NAME.dashboard;
```

### 3. 禁用后台页面解析 (src/extension.ts)

注释掉第 229-230 行：

```typescript
// 禁用后台内容解析
// DashboardSettings.get();
// PagesParser.start();
```

### 4. 在 package.json 中禁用 Dashboard WebView（可选）

如果要更彻底地禁用，可以在 `package.json` 的 `contributes` 部分注释掉 views：

```json
"views": {
  // "frontmatter-explorer": [
  //   {
  //     "id": "frontMatter.explorer",
  //     "name": "Front Matter",
  //     "icon": "$(fm-logo)",
  //     "type": "webview"
  //   }
  // ]
}
```

## 保留的功能

✅ YAML/Front Matter 解析
✅ 自定义脚本支持
✅ 多语言设置
✅ 编辑器面板功能（可选）
✅ 模板功能（如需要）

## 禁用的功能

❌ Dashboard 内容浏览
❌ 自动目录扫描
❌ 内容创建向导
❌ 文件系统监听（内容变化检测）
❌ 后台内容解析

## 重新编译

修改后需要重新编译：

```bash
npm run build:ext
```

或用开发模式调试：

```bash
npm run dev:ext
# 然后按 F5 启动调试会话
```

## 注意

- 这些修改不会影响 VS Code 的扩展加载
- 自定义脚本和 YAML 解析将继续正常工作
- 如需恢复功能，只需取消注释相应行即可
