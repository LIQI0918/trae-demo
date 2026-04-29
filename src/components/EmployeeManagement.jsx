import { useState } from 'react'

function EmployeeManagement({ employees, addEmployee, updateEmployee, deleteEmployee, searchEmployees, refreshEmployees }) {
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState({
    employeeNo: '',
    name: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    hireDate: '',
    status: 'active'
  })
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    department: '',
    status: ''
  })

  const departments = ['技术部', '产品部', '设计部', '市场部', '运营部', '人事部', '财务部']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData)
    } else {
      addEmployee(formData)
    }
    resetForm()
  }

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setFormData({
      employeeNo: employee.employeeNo || '',
      name: employee.name,
      department: employee.department,
      position: employee.position,
      phone: employee.phone || '',
      email: employee.email || '',
      hireDate: employee.hireDate || '',
      status: employee.status || 'active'
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      employeeNo: '',
      name: '',
      department: '',
      position: '',
      phone: '',
      email: '',
      hireDate: '',
      status: 'active'
    })
    setEditingEmployee(null)
    setShowForm(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchEmployees(searchParams.keyword, searchParams.department, searchParams.status)
  }

  const handleResetSearch = () => {
    setSearchParams({ keyword: '', department: '', status: '' })
    refreshEmployees()
  }

  const getStatusText = (status) => {
    return status === 'active' ? '在职' : '离职'
  }

  const getStatusClass = (status) => {
    return status === 'active' ? 'status-normal' : 'status-early'
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>👥 员工管理</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '取消' : '+ 添加员工'}
          </button>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
              <label>搜索</label>
              <input
                type="text"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                placeholder="姓名/工号"
              />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
              <label>部门</label>
              <select
                value={searchParams.department}
                onChange={(e) => setSearchParams({ ...searchParams, department: e.target.value })}
              >
                <option value="">全部部门</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
              <label>状态</label>
              <select
                value={searchParams.status}
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              >
                <option value="">全部状态</option>
                <option value="active">在职</option>
                <option value="inactive">离职</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">搜索</button>
            <button type="button" className="btn" onClick={handleResetSearch}>重置</button>
          </div>
        </form>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>{editingEmployee ? '编辑员工' : '添加员工'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div className="form-group">
                <label>工号</label>
                <input
                  type="text"
                  value={formData.employeeNo}
                  onChange={(e) => setFormData({ ...formData, employeeNo: e.target.value })}
                  placeholder="请输入工号"
                />
              </div>
              <div className="form-group">
                <label>员工姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入员工姓名"
                  required
                />
              </div>
              <div className="form-group">
                <label>所属部门</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                >
                  <option value="">请选择部门</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>职位</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="请输入职位"
                  required
                />
              </div>
              <div className="form-group">
                <label>联系电话</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="请输入联系电话"
                />
              </div>
              <div className="form-group">
                <label>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="请输入邮箱"
                />
              </div>
              <div className="form-group">
                <label>入职日期</label>
                <input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="active">在职</option>
                  <option value="inactive">离职</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editingEmployee ? '保存修改' : '添加员工'}
              </button>
              <button type="button" className="btn" onClick={resetForm}>取消</button>
            </div>
          </form>
        )}

        {employees.length === 0 ? (
          <div className="empty-state">
            <p>暂无员工信息</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>工号</th>
                  <th>员工姓名</th>
                  <th>所属部门</th>
                  <th>职位</th>
                  <th>联系电话</th>
                  <th>邮箱</th>
                  <th>入职日期</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.employeeNo || '-'}</td>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{employee.phone || '-'}</td>
                    <td>{employee.email || '-'}</td>
                    <td>{employee.hireDate || '-'}</td>
                    <td>
                      <span className={`status ${getStatusClass(employee.status)}`}>
                        {getStatusText(employee.status)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          className="btn"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => handleEdit(employee)}
                        >
                          编辑
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => {
                            if (confirm('确定要删除该员工吗？')) {
                              deleteEmployee(employee.id)
                            }
                          }}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeManagement
