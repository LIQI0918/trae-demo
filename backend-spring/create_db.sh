#!/bin/bash

echo "========================================="
echo "  考勤管理系统 - 数据库创建脚本"
echo "========================================="
echo ""

# 默认配置
DB_USER="root"
DB_NAME="attendance_db"

# 读取用户输入
read -p "请输入 MySQL 用户名 [默认: root]: " input_user
if [ ! -z "$input_user" ]; then
    DB_USER="$input_user"
fi

read -s -p "请输入 MySQL 密码: " DB_PASS
echo ""

# 创建数据库
echo "正在创建数据库 $DB_NAME ..."

if [ -z "$DB_PASS" ]; then
    mysql -u "$DB_USER" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF
else
    mysql -u "$DB_USER" -p"$DB_PASS" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 数据库创建成功！"
    echo ""
    echo "数据库名称: $DB_NAME"
    echo "用户名: $DB_USER"
    echo ""
    echo "请编辑 src/main/resources/application.yml 文件"
    echo "配置正确的数据库连接信息"
    echo ""
else
    echo ""
    echo "❌ 数据库创建失败，请检查错误信息"
    echo ""
fi
