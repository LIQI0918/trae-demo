import { useState, useEffect } from 'react'

const TextCounter = () => {
  const [text, setText] = useState('')

  const stats = {
    // 字符数（包括空格）
    charCount: text.length,
    // 字符数（不包括空格）
    charCountNoSpace: text.replace(/\s/g, '').length,
    // 字数（按空格、换行、标点分隔）
    wordCount: text.trim() === '' ? 0 : text.trim().split(/[\s\n，。！？、；：""''（）【】《》]+/).filter(word => word.length > 0).length,
    // 中文字数
    chineseCharCount: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    // 英文字数
    englishCharCount: (text.match(/[a-zA-Z]/g) || []).length,
    // 数字数
    numberCount: (text.match(/[0-9]/g) || []).length,
    // 行数
    lineCount: text === '' ? 0 : text.split('\n').length,
    // 空格数
    spaceCount: (text.match(/\s/g) || []).length,
    // 标点符号数
    punctuationCount: (text.match(/[，。！？、；：""''（）【】《】》,.!?;:"'\(\)\[\]<>]/g) || []).length,
  }

  const clearText = () => {
    setText('')
  }

  const copyText = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text)
        alert('已复制到剪贴板！')
      } catch (err) {
        console.error('复制失败:', err)
        alert('复制失败，请手动复制')
      }
    }
  }

  const loadExample = () => {
    setText(`这是一个文本统计工具，可以统计各种信息。
It can also count English text and numbers like 12345.

支持多行文本来统计，
包括中文字符、英文字符、数字、标点符号等。

试一试吧！`)
  }

  return (
    <div className="card">
      <h2>📊 文本统计</h2>
      
      <p style={{ marginBottom: '20px', color: '#718096' }}>
        输入文本，自动统计字符数、字数、行数等信息
      </p>

      <div className="form-group">
        <label>输入文本</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请在这里输入或粘贴文本..."
          style={{ minHeight: '200px', resize: 'vertical' }}
        />
      </div>

      <div className="btn-group" style={{ marginBottom: '25px' }}>
        <button className="btn" onClick={loadExample} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
          📋 加载示例
        </button>
        <button className="btn" onClick={copyText} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
          📋 复制文本
        </button>
        <button className="btn btn-danger" onClick={clearText}>
          🗑️ 清空
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>{stats.charCount}</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>字符数（含空格）</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>{stats.charCountNoSpace}</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>字符数（不含空格）</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>{stats.wordCount}</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>字数</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>{stats.lineCount}</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>行数</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        <div style={{ padding: '15px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.08) 100%)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3b82f6', marginBottom: '5px' }}>{stats.chineseCharCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>中文字符</div>
        </div>
        
        <div style={{ padding: '15px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>{stats.englishCharCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>英文字符</div>
        </div>
        
        <div style={{ padding: '15px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f59e0b', marginBottom: '5px' }}>{stats.numberCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>数字</div>
        </div>
        
        <div style={{ padding: '15px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444', marginBottom: '5px' }}>{stats.spaceCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>空格数</div>
        </div>
        
        <div style={{ padding: '15px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#8b5cf6', marginBottom: '5px' }}>{stats.punctuationCount}</div>
          <div style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>标点符号</div>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#3b82f6' }}>📖 统计说明</h3>
        <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
          <li><strong>字符数（含空格）：</strong>包括所有字符、空格、换行符</li>
          <li><strong>字符数（不含空格）：</strong>去掉空格和换行符后的字符数</li>
          <li><strong>字数：</strong>按空格、换行、标点符号分隔统计</li>
          <li><strong>中文字符：</strong>统计所有汉字</li>
          <li><strong>英文字符：</strong>统计所有英文字母（区分大小写）</li>
          <li><strong>数字：</strong>统计 0-9 的数字字符</li>
          <li><strong>标点符号：</strong>统计常见的中英文标点符号</li>
        </ul>
      </div>
    </div>
  )
}

export default TextCounter
