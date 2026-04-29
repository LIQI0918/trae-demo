import { useState, useEffect } from 'react'
import CheckIn from './components/CheckIn'
import AttendanceRecords from './components/AttendanceRecords'
import LeaveManagement from './components/LeaveManagement'
import EmployeeManagement from './components/EmployeeManagement'
import RoleManagement from './components/RoleManagement'
import ImageValidation from './components/ImageValidation'
import TimeConverter from './components/TimeConverter'
import TextCounter from './components/TextCounter'
import WatermarkTool from './components/WatermarkTool'
import JsonFormatter from './components/JsonFormatter'
import { api } from './api'

function App() {
  const [activeTab, setActiveTab] = useState('checkin')
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [emps, roleList, records, leaves] = await Promise.all([
        api.employees.getAll(),
        api.roles.getAll(),
        api.attendance.getAll(),
        api.leaves.getAll()
      ])
      setEmployees(emps)
      setRoles(roleList)
      setAttendanceRecords(records)
      setLeaveRequests(leaves)
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const addEmployee = async (employee) => {
    const newEmp = await api.employees.create(employee)
    setEmployees([...employees, newEmp])
  }

  const updateEmployee = async (id, employee) => {
    const updated = await api.employees.update(id, employee)
    setEmployees(employees.map(e => e.id === id ? updated : e))
  }

  const deleteEmployee = async (id) => {
    await api.employees.delete(id)
    setEmployees(employees.filter(e => e.id !== id))
  }

  const searchEmployees = async (keyword, department, status) => {
    const results = await api.employees.search(keyword, department, status)
    setEmployees(results)
  }

  const refreshEmployees = async () => {
    const emps = await api.employees.getAll()
    setEmployees(emps)
  }

  const addRole = async (role) => {
    const newRole = await api.roles.create(role)
    setRoles([...roles, newRole])
  }

  const updateRole = async (id, role) => {
    const updated = await api.roles.update(id, role)
    setRoles(roles.map(r => r.id === id ? updated : r))
  }

  const deleteRole = async (id) => {
    await api.roles.delete(id)
    setRoles(roles.filter(r => r.id !== id))
  }

  const searchRoles = async (keyword, status) => {
    const results = await api.roles.search(keyword, status)
    setRoles(results)
  }

  const refreshRoles = async () => {
    const roleList = await api.roles.getAll()
    setRoles(roleList)
  }

  const addAttendanceRecord = async (record) => {
    const newRecord = await api.attendance.create(record)
    setAttendanceRecords([...attendanceRecords, newRecord])
  }

  const updateAttendanceRecord = async (id, updates) => {
    const updated = await api.attendance.update(id, updates)
    setAttendanceRecords(attendanceRecords.map(r => r.id === id ? updated : r))
  }

  const addLeaveRequest = async (request) => {
    const newLeave = await api.leaves.create(request)
    setLeaveRequests([...leaveRequests, newLeave])
  }

  const updateLeaveStatus = async (id, status) => {
    const updated = await api.leaves.updateStatus(id, status)
    setLeaveRequests(leaveRequests.map(r => r.id === id ? updated : r))
  }

  const deleteLeaveRequest = async (id) => {
    await api.leaves.delete(id)
    setLeaveRequests(leaveRequests.filter(r => r.id !== id))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'checkin':
        return <CheckIn employees={employees} attendanceRecords={attendanceRecords} addAttendanceRecord={addAttendanceRecord} updateAttendanceRecord={updateAttendanceRecord} />
      case 'records':
        return <AttendanceRecords attendanceRecords={attendanceRecords} employees={employees} />
      case 'leave':
        return <LeaveManagement employees={employees} leaveRequests={leaveRequests} addLeaveRequest={addLeaveRequest} updateLeaveStatus={updateLeaveStatus} deleteLeaveRequest={deleteLeaveRequest} />
      case 'employees':
        return <EmployeeManagement 
          employees={employees} 
          addEmployee={addEmployee} 
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          searchEmployees={searchEmployees}
          refreshEmployees={refreshEmployees}
        />
      case 'roles':
        return <RoleManagement 
          roles={roles} 
          addRole={addRole} 
          updateRole={updateRole}
          deleteRole={deleteRole}
          searchRoles={searchRoles}
          refreshRoles={refreshRoles}
        />
      case 'image-validation':
        return <ImageValidation />
      case 'time-converter':
        return <TimeConverter />
      case 'text-counter':
        return <TextCounter />
      case 'watermark-tool':
        return <WatermarkTool />
      case 'json-formatter':
        return <JsonFormatter />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="empty-state">
          <p>正在加载数据...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app app-sidebar">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏢 考勤系统</h2>
        </div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'checkin' ? 'active' : ''} onClick={() => setActiveTab('checkin')}>
            📋 打卡签到
          </button>
          <button className={activeTab === 'records' ? 'active' : ''} onClick={() => setActiveTab('records')}>
            📊 考勤统计
          </button>
          <button className={activeTab === 'leave' ? 'active' : ''} onClick={() => setActiveTab('leave')}>
            📅 请假管理
          </button>
          <button className={activeTab === 'employees' ? 'active' : ''} onClick={() => setActiveTab('employees')}>
            👥 员工管理
          </button>
          <button className={activeTab === 'roles' ? 'active' : ''} onClick={() => setActiveTab('roles')}>
            🎭 角色管理
          </button>
          <button className={activeTab === 'image-validation' ? 'active' : ''} onClick={() => setActiveTab('image-validation')}>
            🖼️ 图片校验
          </button>
          <button className={activeTab === 'time-converter' ? 'active' : ''} onClick={() => setActiveTab('time-converter')}>
            ⏰ 时间转换
          </button>
          <button className={activeTab === 'text-counter' ? 'active' : ''} onClick={() => setActiveTab('text-counter')}>
            📊 文本统计
          </button>
          <button className={activeTab === 'watermark-tool' ? 'active' : ''} onClick={() => setActiveTab('watermark-tool')}>
          🖌️ 图片水印
        </button>
        <button className={activeTab === 'json-formatter' ? 'active' : ''} onClick={() => setActiveTab('json-formatter')}>
          🔧 JSON格式化
        </button>
      </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <h1>🏢 考勤管理系统</h1>
          <p>智能考勤，高效管理</p>
        </header>

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
