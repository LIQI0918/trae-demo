import { useState } from 'react'

function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (e) {
      setOutput('')
      setError(`JSON格式错误: ${e.message}`)
    }
  }

  const compressJson = () => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const compressed = JSON.stringify(parsed)
      setOutput(compressed)
      setError('')
    } catch (e) {
      setOutput('')
      setError(`JSON格式错误: ${e.message}`)
    }
  }

  const copyOutput = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('复制失败:', e)
      alert('复制失败')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadExample = () => {
    const example = {
      name: '张三',
      age: 25,
      department: '技术部',
      skills: ['JavaScript', 'React', 'Node.js'],
      isActive: true,
      projects: [
        {
          id: 1,
          name: '考勤系统',
          status: '进行中'
        },
        {
          id: 2,
          name: 'OA系统',
          status: '已完成'
        }
      ]
    }
    setInput(JSON.stringify(example))
  }

  return (
    <div className="card">
      <h2>🔧 JSON格式化</h2>

      <div className="btn-group" style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={formatJson}>
          ✨ 格式化
        </button>
        <button className="btn" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }} onClick={compressJson}>
          📦 压缩
        </button>
        <button className="btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }} onClick={copyOutput}>
          {copied ? '✅ 已复制' : '📋 复制'}
        </button>
        <button className="btn" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }} onClick={loadExample}>
          📝 示例
        </button>
        <button className="btn btn-danger" onClick={clearAll}>
          🗑️ 清空
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ marginBottom: '8px', display: 'block', fontWeight: '600' }}>
            输入JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='请输入JSON，例如：{"name":"张三","age":25}'
            style={{
              width: '100%',
              minHeight: '400px',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontFamily: 'Menlo, Monaco, Consolas, monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ marginBottom: '8px', display: 'block', fontWeight: '600' }}>
            输出
          </label>
          {error ? (
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              color: '#dc2626',
              borderRadius: '8px',
              minHeight: '400px',
              border: '2px solid #fca5a5'
            }}>
              {error}
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder='输出结果将显示在这里'
              style={{
                width: '100%',
                minHeight: '400px',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontFamily: 'Menlo, Monaco, Consolas, monospace',
                fontSize: '14px',
                background: '#f8fafc',
                resize: 'vertical'
              }}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#3b82f6' }}>📖 使用说明</h3>
        <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
          <li>在左侧输入框粘贴或输入JSON字符串</li>
          <li>点击"格式化"按钮美化JSON（2空格缩进）</li>
          <li>点击"压缩"按钮去除多余的空格和换行</li>
          <li>点击"复制"按钮复制格式化后的JSON</li>
          <li>点击"示例"按钮加载示例JSON进行测试</li>
        </ul>
      </div>
    </div>
  )
}

export default JsonFormatter
