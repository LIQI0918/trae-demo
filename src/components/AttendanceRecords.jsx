function AttendanceRecords({ attendanceRecords, employees }) {
  const stats = {
    total: attendanceRecords.length,
    normal: attendanceRecords.filter(r => r.status === 'normal').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    early: attendanceRecords.filter(r => r.status === 'early').length,
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'normal': return '正常'
      case 'late': return '迟到'
      case 'early': return '早退'
      case 'disabled': return '已禁用'
      default: return status
    }
  }

  const exportToCSV = () => {
    if (attendanceRecords.length === 0) {
      alert('暂无考勤记录可导出')
      return
    }

    // CSV表头
    const headers = ['日期', '员工姓名', '签到时间', '签退时间', '状态']
    
    // CSV内容
    const csvContent = [
      headers.join(','),
      ...attendanceRecords
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(record => [
          record.date,
          record.employeeName,
          record.checkIn || '',
          record.checkOut || '',
          getStatusText(record.status)
        ].join(','))
    ].join('\n')

    // 添加BOM以支持中文
    const BOM = '\uFEFF'
    const csvWithBOM = BOM + csvContent

    // 创建Blob和下载链接
    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `考勤记录_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>总记录数</p>
        </div>
        <div className="stat-card">
          <h3>{stats.normal}</h3>
          <p>正常出勤</p>
        </div>
        <div className="stat-card">
          <h3>{stats.late}</h3>
          <p>迟到次数</p>
        </div>
        <div className="stat-card">
          <h3>{stats.early}</h3>
          <p>早退次数</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📊 考勤记录</h2>
          <button 
            className="btn btn-primary" 
            onClick={exportToCSV}
            disabled={attendanceRecords.length === 0}
          >
            📥 导出CSV
          </button>
        </div>
        {attendanceRecords.length === 0 ? (
          <div className="empty-state">
            <p>暂无考勤记录</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>日期</th>
                <th>员工姓名</th>
                <th>签到时间</th>
                <th>签退时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.employeeName}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut || '-'}</td>
                  <td>
                    <span className={`status status-${record.status}`}>
                      {getStatusText(record.status)}
                    </span>
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

export default AttendanceRecords
