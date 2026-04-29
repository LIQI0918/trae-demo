# 后端切换指南

## 当前状态

✅ **Node.js 后端**：正在运行，可用！
- 地址：http://localhost:3001
- 前端已配置连接到此后端

⏳ **Spring Boot 后端**：已创建，但需要解决 Maven 依赖问题

---

## 使用 Node.js 后端（推荐，当前可用）

Node.js 后端已经在运行，功能完整！您可以直接使用：

1. 前端服务：http://localhost:3000
2. 后端 API：http://localhost:3001

---

## 解决 Spring Boot Maven 问题

如果您想使用 Spring Cloud + MySQL 后端，需要解决 Maven 依赖问题：

### 方法一：检查 Maven settings.xml

检查您的 Maven 配置文件（通常在 `~/.m2/settings.xml`），可能配置了阿里云镜像。

临时解决方案：重命名 settings.xml
```bash
mv ~/.m2/settings.xml ~/.m2/settings.xml.bak
```

然后重新运行：
```bash
cd backend-spring
mvn spring-boot:run
```

### 方法二：使用您本地已有的 Spring Boot 项目

如果您有其他可以正常运行的 Spring Boot 项目，可以将我们的代码复制过去。

### 方法三：配置正确的 Maven 镜像

在 `pom.xml` 中添加可用的镜像源，或者使用 Maven 中央仓库。

---

## 切换到 Spring Boot 后端

当 Spring Boot 后端成功启动后：

1. 停止 Node.js 后端（Ctrl+C）
2. 确保 Spring Boot 运行在 3001 端口
3. 前端会自动连接到 Spring Boot 后端（API 地址相同）

---

## 当前可用的后端

Node.js 后端已包含所有功能：
- ✅ 员工管理
- ✅ 考勤记录
- ✅ 请假管理
- ✅ 完整的 REST API
- ✅ CORS 支持

建议先使用 Node.js 版本进行开发和测试！
