-- =============================================
-- 考勤管理系统 - 数据库表结构和初始化数据
-- =============================================

USE attendance_db;

-- =============================================
-- 1. 员工表
-- =============================================
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 2. 考勤记录表
-- =============================================
CREATE TABLE IF NOT EXISTS attendance_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    date VARCHAR(20) NOT NULL,
    check_in VARCHAR(20),
    check_out VARCHAR(20),
    status VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 3. 请假申请表
-- =============================================
CREATE TABLE IF NOT EXISTS leave_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    reason VARCHAR(500) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 初始化基础数据
-- =============================================

-- 插入员工数据
INSERT INTO employees (name, department, position, status) VALUES
('张三', '技术部', '前端工程师', 'active'),
('李四', '产品部', '产品经理', 'active'),
('王五', '设计部', 'UI设计师', 'active');

-- 插入考勤记录
INSERT INTO attendance_records (employee_id, employee_name, date, check_in, check_out, status) VALUES
(1, '张三', '2026-04-17', '08:55', '18:05', 'normal'),
(2, '李四', '2026-04-17', '09:15', NULL, 'late');

-- 插入请假申请
INSERT INTO leave_requests (employee_id, employee_name, type, start_date, end_date, reason, status) VALUES
(1, '张三', '年假', '2026-04-20', '2026-04-21', '回家探亲', 'pending');

-- =============================================
-- 验证数据
-- =============================================
SELECT '员工表数据:' AS info;
SELECT * FROM employees;

SELECT '考勤记录表数据:' AS info;
SELECT * FROM attendance_records;

SELECT '请假申请表数据:' AS info;
SELECT * FROM leave_requests;

-- =============================================
-- 完成！
-- =============================================
SELECT '数据库表创建和数据初始化完成！' AS message;
