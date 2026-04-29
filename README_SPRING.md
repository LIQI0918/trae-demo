# 考勤管理系统 - Spring Cloud + MySQL 版本

## 技术栈

### 前端
- React 18
- Vite 4
- 原生 CSS

### 后端
- Java 11
- Spring Boot 2.7.18
- Spring Cloud 2021.0.8
- Spring Data JPA
- MySQL 8.0
- Lombok

## 项目结构

```
trae-demo/
├── backend/              # Node.js 版本后端（旧版）
├── backend-spring/       # Spring Cloud 版本后端
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── attendance/
│   │       │           ├── AttendanceApplication.java
│   │       │           ├── config/
│   │       │           │   └── DataInitializer.java
│   │       │           ├── controller/
│   │       │           │   ├── EmployeeController.java
│   │       │           │   ├── AttendanceRecordController.java
│   │       │           │   └── LeaveRequestController.java
│   │       │           ├── entity/
│   │       │           │   ├── Employee.java
│   │       │           │   ├── AttendanceRecord.java
│   │       │           │   └── LeaveRequest.java
│   │       │           ├── repository/
│   │       │           │   ├── EmployeeRepository.java
│   │       │           │   ├── AttendanceRecordRepository.java
│   │       │           │   └── LeaveRequestRepository.java
│   │       │           └── service/
│   │       │               ├── EmployeeService.java
│   │       │               ├── AttendanceRecordService.java
│   │       │               └── LeaveRequestService.java
│   │       └── resources/
│   │           └── application.yml
│   ├── pom.xml
│   └── init-db.sql
├── src/                 # 前端源代码
└── ...
```

## 快速开始

### 前置条件

- JDK 11 或更高版本
- Maven 3.6+
- MySQL 8.0+
- Node.js 16+

### 数据库配置

1. 启动 MySQL 服务
2. 执行初始化脚本：
```bash
mysql -u root -p < backend-spring/init-db.sql
```

3. 修改 `backend-spring/src/main/resources/application.yml` 中的数据库连接信息：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/attendance_db?...
    username: root      # 修改为您的用户名
    password: root      # 修改为您的密码
```

### 启动后端服务

```bash
cd backend-spring
mvn clean install
mvn spring-boot:run
```

后端服务将运行在：http://localhost:3001

### 启动前端服务

```bash
npm install
npm run dev
```

前端服务将运行在：http://localhost:3000

## API 接口

### 员工管理
- `GET /api/employees` - 获取所有员工
- `POST /api/employees` - 添加新员工
- `DELETE /api/employees/{id}` - 删除员工

### 考勤记录
- `GET /api/attendance` - 获取所有考勤记录
- `POST /api/attendance` - 添加考勤记录
- `PUT /api/attendance/{id}` - 更新考勤记录

### 请假管理
- `GET /api/leaves` - 获取所有请假申请
- `POST /api/leaves` - 提交请假申请
- `PUT /api/leaves/{id}/status` - 更新请假状态
- `DELETE /api/leaves/{id}` - 删除请假申请

## 数据库表结构

系统会自动通过 JPA 创建以下表：

- `employees` - 员工表
- `attendance_records` - 考勤记录表
- `leave_requests` - 请假申请表

## 数据初始化

系统首次启动时会自动初始化示例数据：
- 3名员工（张三、李四、王五）
- 2条考勤记录
- 1条请假申请

## 开发说明

### 后端分层架构

- **Entity 层**：数据库实体映射
- **Repository 层**：数据访问层，继承 JpaRepository
- **Service 层**：业务逻辑层
- **Controller 层**：REST API 控制器

### Spring Cloud 集成

当前项目已包含 Spring Cloud 依赖管理，后续可方便集成：
- Eureka 服务注册与发现
- Config 配置中心
- Gateway 网关
- Feign 远程调用
- Hystrix 熔断降级

## 打包部署

### 后端打包

```bash
cd backend-spring
mvn clean package
java -jar target/attendance-system-1.0.0.jar
```

### 前端打包

```bash
npm run build
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
