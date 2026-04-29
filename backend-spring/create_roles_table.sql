-- =============================================
-- 角色管理 - 数据库表结构和初始化数据
-- =============================================

USE attendance_db;

-- =============================================
-- 1. 角色表
-- =============================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at DATETIME,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 初始化基础角色数据
-- =============================================

-- 插入默认角色
INSERT INTO roles (name, code, description, status) VALUES
('超级管理员', 'SUPER_ADMIN', '拥有系统所有权限', 'active'),
('管理员', 'ADMIN', '管理系统日常运营', 'active'),
('员工', 'EMPLOYEE', '普通员工权限', 'active'),
('部门经理', 'MANAGER', '部门管理权限', 'active');

-- =============================================
-- 验证数据
-- =============================================
SELECT '角色表数据:' AS info;
SELECT * FROM roles;

-- =============================================
-- 完成！
-- =============================================
SELECT '角色表创建和数据初始化完成！' AS message;
