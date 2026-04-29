import { useState } from 'react'

function LeaveManagement({ employees, leaveRequests, addLeaveRequest, updateLeaveStatus, deleteLeaveRequest }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: '',
    type: '年假',
    startDate: '',
    endDate: '',
    reason: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const employee = employees.find(e => e.id === parseInt(formData.employeeId))
    if (!employee) {
      alert('请选择员工')
      return
    }

    addLeaveRequest({
      ...formData,
      employeeId: parseInt(formData.employeeId),
      employeeName: employee.name,
    })

    setFormData({
      employeeId: '',
      type: '年假',
      startDate: '',
      endDate: '',
      reason: '',
    })
    setShowForm(false)
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return '待审批'
      case 'approved': return '已批准'
      case 'rejected': return '已拒绝'
      default: return status
    }
  }

  const leaveTypes = ['年假', '事假', '病假', '婚假', '产假', '丧假']

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📅 请假管理</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '取消' : '+ 申请请假'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div className="form-group">
              <label>选择员工</label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
              >
                <option value="">请选择员工</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>请假类型</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>开始日期</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>结束日期</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>请假原因</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">提交申请</button>
          </form>
        )}

        {leaveRequests.length === 0 ? (
          <div className="empty-state">
            <p>暂无请假申请</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>员工姓名</th>
                <th>请假类型</th>
                <th>开始日期</th>
                <th>结束日期</th>
                <th>请假原因</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.type}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.reason}</td>
                  <td>
                    <span className={`status status-${request.status}`}>
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' && (
                      <div className="btn-group">
                        <button
                          className="btn btn-success"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => updateLeaveStatus(request.id, 'approved')}
                        >
                          批准
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => updateLeaveStatus(request.id, 'rejected')}
                        >
                          拒绝
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                          onClick={() => deleteLeaveRequest(request.id)}
                        >
                          删除
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default LeaveManagement
