-- =============================================
-- 更新员工表 - 添加新字段
-- =============================================

USE attendance_db;

-- 添加新字段到 employees 表
ALTER TABLE employees 
ADD COLUMN employee_no VARCHAR(50) UNIQUE AFTER id,
ADD COLUMN phone VARCHAR(20) AFTER position,
ADD COLUMN email VARCHAR(100) AFTER phone,
ADD COLUMN hire_date DATE AFTER email;

-- 更新现有员工数据
UPDATE employees SET employee_no = 'EMP001' WHERE id = 1;
UPDATE employees SET employee_no = 'EMP002' WHERE id = 2;
UPDATE employees SET employee_no = 'EMP003' WHERE id = 3;

UPDATE employees SET phone = '13800138001', email = 'zhangsan@example.com', hire_date = '2024-01-15' WHERE id = 1;
UPDATE employees SET phone = '13800138002', email = 'lisi@example.com', hire_date = '2024-03-20' WHERE id = 2;
UPDATE employees SET phone = '13800138003', email = 'wangwu@example.com', hire_date = '2024-02-10' WHERE id = 3;

-- 验证更新
SELECT '更新后的员工表数据:' AS info;
SELECT * FROM employees;

SELECT '员工表更新完成！' AS message;
