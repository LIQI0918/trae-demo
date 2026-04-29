# 数据库设置指南

## 方法一：使用 MySQL 命令行

### 1. 连接到 MySQL
```bash
mysql -u root -p
```
（输入您的 MySQL 密码）

### 2. 创建数据库
在 MySQL 命令行中执行：
```sql
CREATE DATABASE IF NOT EXISTS attendance_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. 验证数据库创建成功
```sql
SHOW DATABASES;
```
您应该能看到 `attendance_db` 数据库。

### 4. 退出 MySQL
```sql
EXIT;
```

## 方法二：使用初始化脚本

### 1. 编辑 `init-db.sql` 文件
如果需要，修改数据库名称或字符集。

### 2. 执行脚本
```bash
mysql -u root -p < init-db.sql
```
（输入您的 MySQL 密码）

## 方法三：使用 GUI 工具（如 Navicat、phpMyAdmin 等）

1. 打开您的 MySQL GUI 工具
2. 连接到 MySQL 服务器
3. 创建新数据库，命名为 `attendance_db`
4. 设置字符集为 `utf8mb4`，排序规则为 `utf8mb4_unicode_ci`

## 验证数据库是否创建成功

在命令行中执行：
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

如果看到 `attendance_db`，说明数据库创建成功！

## 配置 Spring Boot 连接

编辑 `application.yml` 文件，修改数据库连接信息：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/attendance_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
    username: root
    password: 您的MySQL密码    # 这里修改为您的实际密码
```

## 常见问题

### Q: 提示 "Access denied for user 'root'@'localhost'"
A: 检查用户名和密码是否正确。

### Q: 提示 "Can't connect to MySQL server"
A: 确保 MySQL 服务已启动。

### Q: 数据库创建了但 Spring Boot 连接失败
A: 检查 `application.yml` 中的 URL、用户名和密码是否正确。

## 下一步

数据库创建成功后，启动 Spring Boot 应用：
```bash
cd backend-spring
mvn clean install
mvn spring-boot:run
```
