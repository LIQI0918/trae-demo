import { useState, useEffect } from 'react'

function CheckIn({ employees, attendanceRecords, addAttendanceRecord, updateAttendanceRecord }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [todayRecord, setTodayRecord] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (selectedEmployee) {
      const today = new Date().toISOString().split('T')[0]
      const record = attendanceRecords.find(
        r => r.employeeId === parseInt(selectedEmployee) && r.date === today
      )
      setTodayRecord(record)
    }
  }, [selectedEmployee, attendanceRecords])

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
  }

  const handleCheckIn = () => {
    if (!selectedEmployee) {
      alert('请先选择员工')
      return
    }

    const employee = employees.find(e => e.id === parseInt(selectedEmployee))
    const now = new Date()
    const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    const date = now.toISOString().split('T')[0]
    
    const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 0)
    const status = isLate ? 'late' : 'normal'

    const newRecord = {
      employeeId: parseInt(selectedEmployee),
      employeeName: employee.name,
      date,
      checkIn: time,
      checkOut: null,
      status
    }

    addAttendanceRecord(newRecord)
    setTodayRecord(newRecord)
    alert('签到成功！')
  }

  const handleCheckOut = () => {
    if (!todayRecord) return

    const now = new Date()
    const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    
    const isEarly = now.getHours() < 18
    let newStatus = todayRecord.status
    if (isEarly && todayRecord.status === 'normal') {
      newStatus = 'early'
    }

    updateAttendanceRecord(todayRecord.id, { checkOut: time, status: newStatus })
    setTodayRecord({ ...todayRecord, checkOut: time, status: newStatus })
    alert('签退成功！')
  }

  return (
    <div className="card">
      <div className="clock-section">
        <div className="clock-display">{formatTime(currentTime)}</div>
        <div className="date-display">{formatDate(currentTime)}</div>
      </div>

      <div className="form-group">
        <label>选择员工</label>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">请选择员工</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <div className="check-in-section">
          <button 
            className="btn btn-success check-btn" 
            onClick={handleCheckIn}
            disabled={todayRecord?.checkIn}
          >
            🔔 签到
          </button>
          <button 
            className="btn btn-warning check-btn" 
            onClick={handleCheckOut}
            disabled={!todayRecord?.checkIn || todayRecord?.checkOut}
          >
            🏁 签退
          </button>
        </div>
      )}

      {todayRecord && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h3>今日打卡记录</h3>
          <p><strong>签到时间：</strong>{todayRecord.checkIn || '未签到'}</p>
          <p><strong>签退时间：</strong>{todayRecord.checkOut || '未签退'}</p>
          <p><strong>状态：</strong>
            <span className={`status status-${todayRecord.status}`}>
              {todayRecord.status === 'normal' ? '正常' : todayRecord.status === 'late' ? '迟到' : '早退'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default CheckIn
