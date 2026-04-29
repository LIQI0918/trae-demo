import { useState } from 'react'

const TimeConverter = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const convertTime = () => {
    if (!inputText.trim()) {
      setOutputText('')
      return
    }

    // 匹配 "YYYY-MM-DD HH:MM:SS" 格式
    const timePattern = /\d{4}-\d{2}-\d{2} (\d{2}:\d{2}):\d{2}/g
    
    let result = inputText
    let match
    
    // 重置正则表达式的 lastIndex
    timePattern.lastIndex = 0
    
    // 使用 replace 进行替换
    result = inputText.replace(timePattern, (match, timePart) => {
      return timePart
    })
    
    setOutputText(result)
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
  }

  const copyOutput = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText)
        alert('已复制到剪贴板！')
      } catch (err) {
        console.error('复制失败:', err)
        alert('复制失败，请手动复制')
      }
    }
  }

  const loadExample = () => {
    setInputText(`2026-04-01 08:36:00 \t 2026-04-01 17:38:00 
2026-04-01 08:18:00 \t 2026-04-01 17:34:00 
2026-04-01 08:40:00 \t 2026-04-01 17:37:00 
2026-04-01 08:26:00 \t 2026-04-01 17:34:00 
2026-04-01 08:27:00 \t 2026-04-01 17:48:00 
2026-04-01 08:44:00 \t 2026-04-01 17:54:00`)
  }

  return (
    <div className="card">
      <h2>⏰ 时间格式转换</h2>
      
      <p style={{ marginBottom: '20px', color: '#718096' }}>
        将 "YYYY-MM-DD HH:MM:SS" 格式转换为 "HH:MM" 格式
      </p>

      <div className="form-group">
        <label>输入文本</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入包含时间格式的文本，例如：
2026-04-01 08:36:00 	 2026-04-01 17:38:00"
          style={{ minHeight: '200px', resize: 'vertical' }}
        />
      </div>

      <div className="btn-group" style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={convertTime}>
          🔄 转换
        </button>
        <button className="btn" onClick={loadExample} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
          📋 加载示例
        </button>
        <button className="btn" onClick={copyOutput} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
          📋 复制结果
        </button>
        <button className="btn btn-danger" onClick={clearAll}>
          🗑️ 清空
        </button>
      </div>

      {outputText && (
        <div className="form-group">
          <label>转换结果</label>
          <textarea
            value={outputText}
            readOnly
            style={{ minHeight: '200px', resize: 'vertical', background: '#f7fafc' }}
          />
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#3b82f6' }}>📖 使用说明</h3>
        <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
          <li><strong>输入格式：</strong>2026-04-01 08:27:00</li>
          <li><strong>输出格式：</strong>08:27</li>
          <li><strong>支持批量：</strong>可以一次粘贴多行数据</li>
          <li><strong>保留格式：</strong>转换时会保留原有的换行和制表符</li>
        </ul>
      </div>
    </div>
  )
}

export default TimeConverter
