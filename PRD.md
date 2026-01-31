# Jack's AI Tools - 产品需求文档

## 1. 项目概述

**项目名称**: Jack's AI Tools  
**项目类型**: 个人主页 + AI 工具导航站  
**目标用户**: 公司同事、外部访客  
**技术栈**: 纯前端 HTML/CSS/JS，静态部署  

---

## 2. 核心需求

### 2.1 功能需求
- [x] 个人主页展示（介绍、联系方式）
- [x] 工具导航/列表页面
- [x] 已有工具：GIF 合成器（单页 HTML）
- [x] 响应式设计（移动端 + 桌面端）
- [x] 极简白视觉风格

### 2.2 非功能需求
- [x] 部署：GitHub Pages + Vercel
- [x] 纯静态，无需后端
- [x] 易维护：通过修改 JSON 可新增工具
- [x] 性能：首屏加载 < 2s

---

## 3. 信息架构

```
/
├── index.html          # 个人主页
├── tools/
│   ├── index.html      # 工具导航页
│   └── gif-maker/      # GIF 合成工具
│       └── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│       └── logo.svg    # AI 生成 Logo
└── data/
    └── tools.json      # 工具列表数据
```

---

## 4. 页面设计

### 4.1 设计风格：极简白

**色彩方案**:
- 主背景：#FFFFFF（纯白）
- 次背景：#F8F9FA（浅灰）
- 主文字：#1A1A1A（近黑）
- 次文字：#6B7280（灰色）
- 强调色：#2563EB（蓝色，用于按钮和链接）
- 边框：#E5E7EB（浅灰边框）

**字体**:
- 中文：系统默认（-apple-system, "PingFang SC", "Microsoft YaHei"）
- 英文：Inter, system-ui

**间距系统**:
- 小间距：16px
- 中间距：24px
- 大间距：48px
- 页面边距：移动端 16px，桌面端 48px

---

### 4.2 个人主页 (index.html)

**布局**：单屏居中，垂直弹性布局

**结构**：
1. **Header**
   - Logo（左侧）：Jack's AI Tools
   - 导航（右侧）：首页 | 工具集

2. **Hero Section**（居中）
   - 头像/Logo：80px 圆形，带阴影
   - 姓名：Jack Ding
   - 签名："喜欢用 AI 解决实际问题"
   - 简介：2-3 行文字介绍
   - CTA 按钮："浏览工具" → 跳转到工具页

3. **Footer**
   - 联系邮箱：269452034@qq.com
   - GitHub 图标链接
   - 版权信息：© 2025 Jack Ding

---

### 4.3 工具导航页 (tools/index.html)

**布局**：列表式卡片布局

**结构**：
1. **Header**（同首页）

2. **页面标题**
   - 标题：工具集
   - 副标题：实用的小工具，本地处理，隐私安全

3. **工具列表**（从 tools.json 动态渲染）
   - 卡片结构：
     - 图标（48px）
     - 工具名称
     - 简短描述（1-2行）
     - 标签（如：图片、本地处理）
   - 网格布局：
     - 桌面：3列
     - 平板：2列
     - 手机：1列

4. **暂无更多**
   - 提示："更多工具开发中..."

5. **Footer**（同首页）

---

### 4.4 GIF 合成工具页 (tools/gif-maker/index.html)

**说明**：复用用户提供的完整 HTML 代码，进行以下调整：
- 添加统一的 Header 导航
- 添加统一的 Footer
- 保持原有功能和样式

---

## 5. Logo 需求

**类型**: SVG 矢量图  
**尺寸**: 40x40px（Header），80x80px（主页）  
**设计理念**:
- 体现 AI + 工具的概念
- 极简线条风格
- 可选元素：
  - 几何图形组合（如六边形 + 工具图标）
  - 字母 "J" 的艺术化
  - 科技感的渐变或单色线条

**颜色**: 单色 #2563EB（蓝色）或与白色搭配

---

## 6. 数据结构

### tools.json
```json
{
  "tools": [
    {
      "id": "gif-maker",
      "name": "GIF 合成器",
      "description": "多张图片合成为 GIF，支持调整尺寸和帧率，纯本地处理",
      "icon": "🎬",
      "tags": ["图片", "本地处理"],
      "url": "/tools/gif-maker/",
      "date": "2025-01"
    }
  ]
}
```

---

## 7. 技术实现

### 7.1 文件结构
```
jack-tools/
├── index.html              # 个人主页
├── tools/
│   ├── index.html          # 工具导航页
│   └── gif-maker/
│       └── index.html      # GIF 工具（用户提供）
├── assets/
│   ├── css/
│   │   └── style.css       # 全局样式
│   ├── js/
│   │   └── main.js         # 工具渲染逻辑
│   └── images/
│       └── logo.svg        # Logo
├── data/
│   └── tools.json          # 工具数据
└── README.md               # 项目说明
```

### 7.2 响应式断点
- 手机：< 640px
- 平板：640px - 1024px
- 桌面：> 1024px

### 7.3 部署配置
- **GitHub**: 创建仓库，推送代码
- **Vercel**: 连接 GitHub 仓库，自动部署

---

## 8. 实现阶段

### Phase 1: 基础框架
- [ ] 创建项目目录结构
- [ ] 编写全局 CSS（极简白风格）
- [ ] 创建 Header 和 Footer 组件

### Phase 2: 个人主页
- [ ] 实现 index.html
- [ ] 添加 Logo 和头像区域
- [ ] 添加个人介绍文案

### Phase 3: 工具导航
- [ ] 创建 tools.json
- [ ] 实现工具卡片渲染 JS
- [ ] 实现 tools/index.html

### Phase 4: 整合 GIF 工具
- [ ] 迁移用户提供的 HTML 代码
- [ ] 统一 Header/Footer

### Phase 5: 响应式优化
- [ ] 手机端适配
- [ ] 平板端适配

### Phase 6: 部署上线
- [ ] GitHub 仓库初始化
- [ ] Vercel 配置
- [ ] 测试验证

---

## 9. 后续扩展（未来版本）

- 暗色模式切换
- 更多 AI 工具接入
- 用户反馈收集
- 使用统计（可选）

---

*文档版本: v1.0*  
*创建日期: 2025-01-31*  
*作者: Jack Ding*
