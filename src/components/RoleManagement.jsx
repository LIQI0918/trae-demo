import { useState } from 'react'

function RoleManagement({ roles, addRole, updateRole, deleteRole, searchRoles, refreshRoles }) {
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'active'
  })
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    status: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingRole) {
      updateRole(editingRole.id, formData)
    } else {
      addRole(formData)
    }
    resetForm()
  }

  const handleEdit = (role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      code: role.code,
      description: role.description || '',
      status: role.status || 'active'
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'active'
    })
    setEditingRole(null)
    setShowForm(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchRoles(searchParams.keyword, searchParams.status)
  }

  const handleResetSearch = () => {
    setSearchParams({ keyword: '', status: '' })
    refreshRoles()
  }

  const getStatusText = (status) => {
    return status === 'active' ? '启用' : '禁用'
  }

  const getStatusClass = (status) => {
    return status === 'active' ? 'status-normal' : 'status-early'
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '-'
    return new Date(dateTime).toLocaleString('zh-CN')
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>🎭 角色管理</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '取消' : '+ 添加角色'}
          </button>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
              <label>搜索</label>
              <input
                type="text"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                placeholder="角色名称/编码"
              />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
              <label>状态</label>
              <select
                value={searchParams.status}
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              >
                <option value="">全部状态</option>
                <option value="active">启用</option>
                <option value="inactive">禁用</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">搜索</button>
            <button type="button" className="btn" onClick={handleResetSearch}>重置</button>
          </div>
        </form>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>{editingRole ? '编辑角色' : '添加角色'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div className="form-group">
                <label>角色名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入角色名称"
                  required
                />
              </div>
              <div className="form-group">
                <label>角色编码</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="请输入角色编码"
                  required
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>角色描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请输入角色描述"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="active">启用</option>
                  <option value="inactive">禁用</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editingRole ? '保存修改' : '添加角色'}
              </button>
              <button type="button" className="btn" onClick={resetForm}>取消</button>
            </div>
          </form>
        )}

        {roles.length === 0 ? (
          <div className="empty-state">
            <p>暂无角色信息</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>角色名称</th>
                  <th>角色编码</th>
                  <th>角色描述</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td><strong>{role.name}</strong></td>
                    <td><code>{role.code}</code></td>
                    <td>{role.description || '-'}</td>
                    <td>
                      <span className={`status ${getStatusClass(role.status)}`}>
                        {getStatusText(role.status)}
                      </span>
                    </td>
                    <td>{formatDateTime(role.createdAt)}</td>
                    <td>{formatDateTime(role.updatedAt)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          className="btn"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => handleEdit(role)}
                        >
                          编辑
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => {
                            if (confirm('确定要删除该角色吗？')) {
                              deleteRole(role.id)
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

export default RoleManagement
