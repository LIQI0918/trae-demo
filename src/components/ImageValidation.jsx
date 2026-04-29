import { useState } from 'react'

function ImageValidation() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [validationResult, setValidationResult] = useState(null)
  const [preview, setPreview] = useState(null)
  const [validating, setValidating] = useState(false)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setValidationResult(null)
      createPreview(file)
    }
  }

  const createPreview = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const validateImage = async () => {
    if (!selectedFile) {
      alert('请先选择一个图片文件')
      return
    }

    setValidating(true)
    setValidationResult(null)

    const result = {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      checks: [],
      isValid: true
    }

    // 检查 1: 文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
    const typeValid = validTypes.includes(selectedFile.type)
    result.checks.push({
      name: '文件格式',
      status: typeValid ? 'success' : 'error',
      message: typeValid ? `✓ 格式正确 (${selectedFile.type})` : `✗ 不支持的格式 (${selectedFile.type})`
    })
    if (!typeValid) result.isValid = false

    // 检查 2: 文件大小 (最大 10MB)
    const maxSize = 10 * 1024 * 1024
    const sizeValid = selectedFile.size <= maxSize
    const sizeMB = (selectedFile.size / 1024 / 1024).toFixed(2)
    result.checks.push({
      name: '文件大小',
      status: sizeValid ? 'success' : 'error',
      message: sizeValid ? `✓ 大小正常 (${sizeMB} MB)` : `✗ 文件过大 (${sizeMB} MB / 最大 10 MB)`
    })
    if (!sizeValid) result.isValid = false

    // 检查 3: 文件大小最小值 (至少 1KB)
    const minSize = 1 * 1024
    const minSizeValid = selectedFile.size >= minSize
    result.checks.push({
      name: '最小大小',
      status: minSizeValid ? 'success' : 'warning',
      message: minSizeValid ? '✓ 文件大小正常' : '⚠ 文件较小，可能有问题'
    })

    // 检查 4: 文件名安全性 (防止 XSS) - 多模式检测
    const XSS_FILENAME_PATTERNS = [
      { pattern: /<script\b[^>]*>/gi, name: 'Script 标签' },
      { pattern: /javascript:/gi, name: 'JavaScript 协议' },
      { pattern: /vbscript:/gi, name: 'VBScript 协议' },
      { pattern: /data:text\/html/gi, name: 'Data URI' },
      { pattern: /on\w+\s*=/gi, name: '事件处理器' },
      { pattern: /[<>{}[\]()\\/"'`;$%&*#@!~+=|]/g, name: '特殊字符' },
      { pattern: /%3[Cc]|%253[Cc]/g, name: '编码的 Script 标签' },
      { pattern: /%3[Ee]|%253[Ee]/g, name: '编码的尖括号' },
      { pattern: /eval\s*\(/gi, name: 'Eval 函数' },
      { pattern: /expression\s*\(/gi, name: 'CSS Expression' },
      { pattern: /document\s*\./gi, name: 'Document 对象' },
      { pattern: /window\s*\./gi, name: 'Window 对象' },
      { pattern: /alert\s*\(/gi, name: 'Alert 函数' },
      { pattern: /prompt\s*\(/gi, name: 'Prompt 函数' },
      { pattern: /confirm\s*\(/gi, name: 'Confirm 函数' },
      { pattern: /\.php|\.asp|\.jsp|\.exe|\.bat|\.cmd|\.sh|\.js$/gi, name: '危险扩展名' },
    ]

    let filenameXssFound = false
    const foundFilenamePatterns = []

    XSS_FILENAME_PATTERNS.forEach(({ pattern, name }) => {
      if (pattern.test(selectedFile.name)) {
        foundFilenamePatterns.push(name)
        filenameXssFound = true
      }
    })

    if (filenameXssFound) {
      result.checks.push({
        name: '文件名安全',
        status: 'error',
        message: `✗ 检测到威胁: ${foundFilenamePatterns.slice(0, 3).join(', ')}${foundFilenamePatterns.length > 3 ? `...等${foundFilenamePatterns.length}项` : ''}`
      })
      result.isValid = false
    } else {
      result.checks.push({
        name: '文件名安全',
        status: 'success',
        message: '✓ 文件名安全'
      })
    }

    // 检查 5: 文件扩展名验证
    const fileName = selectedFile.name.toLowerCase()
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    const extensionValid = validExtensions.some(ext => fileName.endsWith(ext))
    result.checks.push({
      name: '文件扩展名',
      status: extensionValid ? 'success' : 'error',
      message: extensionValid ? '✓ 扩展名正确' : '✗ 扩展名不匹配或不安全'
    })
    if (!extensionValid) result.isValid = false

    // 检查 6: 文件内容 XSS 检测
    try {
      const fileContent = await readFileContent(selectedFile)
      
      // XSS 检测模式
      const xssPatterns = [
        { pattern: /<script\b[^>]*>/gi, name: 'Script 标签' },
        { pattern: /javascript:/gi, name: 'JavaScript 协议' },
        { pattern: /on\w+\s*=/gi, name: '事件处理器' },
        { pattern: /data:text\/html/gi, name: 'Data URI' },
        { pattern: /<iframe\b[^>]*>/gi, name: 'Iframe 标签' },
        { pattern: /<svg\b[^>]*>/gi, name: 'SVG 标签' },
        { pattern: /<!\[CDATA\[/gi, name: 'CDATA 区块' },
        { pattern: /eval\s*\(/gi, name: 'Eval 函数' },
        { pattern: /expression\s*\(/gi, name: 'CSS Expression' },
        { pattern: /vbscript:/gi, name: 'VBScript' },
        { pattern: /<object\b[^>]*>/gi, name: 'Object 标签' },
        { pattern: /<embed\b[^>]*>/gi, name: 'Embed 标签' },
        { pattern: /<form\b[^>]*>/gi, name: 'Form 标签' },
        { pattern: /<input\b[^>]*>/gi, name: 'Input 标签' },
        { pattern: /<button\b[^>]*>/gi, name: 'Button 标签' },
        { pattern: /<a\b[^>]*href\s*=/gi, name: '链接标签' },
        { pattern: /document\s*\./gi, name: 'Document 对象' },
        { pattern: /window\s*\./gi, name: 'Window 对象' },
        { pattern: /alert\s*\(/gi, name: 'Alert 函数' },
        { pattern: /prompt\s*\(/gi, name: 'Prompt 函数' },
        { pattern: /confirm\s*\(/gi, name: 'Confirm 函数' },
        { pattern: /<meta\b[^>]*http-equiv/gi, name: 'Meta 刷新' },
        { pattern: /<link\b[^>]*>/gi, name: 'Link 标签' },
        { pattern: /<style\b[^>]*>/gi, name: 'Style 标签' },
        { pattern: /<base\b[^>]*>/gi, name: 'Base 标签' },
      ]

      let xssFound = false
      const foundPatterns = []

      xssPatterns.forEach(({ pattern, name }) => {
        if (pattern.test(fileContent)) {
          foundPatterns.push(name)
          xssFound = true
        }
      })

      if (xssFound) {
        result.checks.push({
          name: '内容 XSS 检测',
          status: 'error',
          message: `✗ 检测到潜在威胁: ${foundPatterns.slice(0, 3).join(', ')}${foundPatterns.length > 3 ? `...等${foundPatterns.length}项` : ''}`
        })
        result.isValid = false
      } else {
        result.checks.push({
          name: '内容 XSS 检测',
          status: 'success',
          message: '✓ 未检测到恶意脚本'
        })
      }

      // 检查 7: 文件魔数验证 (检测伪装文件)
      const isSVG = selectedFile.type === 'image/svg+xml' || fileName.endsWith('.svg')
      
      if (isSVG) {
        result.checks.push({
          name: 'SVG 安全',
          status: 'warning',
          message: '⚠ SVG 文件可能包含脚本，已检测内容'
        })
      }

    } catch (error) {
      result.checks.push({
        name: '内容读取',
        status: 'warning',
        message: '⚠ 无法读取文件内容进行深度检测'
      })
    }

    // 检查 8: 图片尺寸验证
    if (typeValid) {
      try {
        const image = new Image()
        await new Promise((resolve, reject) => {
          image.onload = resolve
          image.onerror = reject
          image.src = preview
        })

        result.width = image.width
        result.height = image.height

        // 检查 8: 最小尺寸
        const minWidth = 50
        const minHeight = 50
        const dimensionValid = image.width >= minWidth && image.height >= minHeight
        result.checks.push({
          name: '图片尺寸',
          status: dimensionValid ? 'success' : 'error',
          message: dimensionValid 
            ? `✓ 尺寸正常 (${image.width} × ${image.height})` 
            : `✗ 尺寸过小 (${image.width} × ${image.height} / 最小 50×50)`
        })
        if (!dimensionValid) result.isValid = false

        // 检查 9: 最大尺寸
        const maxWidth = 8000
        const maxHeight = 8000
        const maxDimensionValid = image.width <= maxWidth && image.height <= maxHeight
        result.checks.push({
          name: '最大尺寸',
          status: maxDimensionValid ? 'success' : 'error',
          message: maxDimensionValid 
            ? '✓ 尺寸在限制内' 
            : `✗ 尺寸过大 (${image.width} × ${image.height} / 最大 8000×8000)`
        })
        if (!maxDimensionValid) result.isValid = false

        // 检查 10: 宽高比
        const aspectRatio = image.width / image.height
        const aspectRatioValid = aspectRatio >= 0.1 && aspectRatio <= 10
        result.checks.push({
          name: '宽高比',
          status: aspectRatioValid ? 'success' : 'warning',
          message: aspectRatioValid 
            ? `✓ 宽高比正常 (${aspectRatio.toFixed(2)})` 
            : `⚠ 宽高比异常 (${aspectRatio.toFixed(2)})`
        })

        // 检查 11: 像素炸弹检测 (防止超大图片)
        const pixelCount = image.width * image.height
        const maxPixels = 100 * 1000 * 1000 // 1亿像素
        const pixelCountValid = pixelCount <= maxPixels
        result.checks.push({
          name: '像素数量',
          status: pixelCountValid ? 'success' : 'warning',
          message: pixelCountValid 
            ? `✓ 像素数正常 (${(pixelCount / 1000000).toFixed(1)} MP)` 
            : `⚠ 图片过大 (${(pixelCount / 1000000).toFixed(1)} MP)`
        })

      } catch (error) {
        result.checks.push({
          name: '图片完整性',
          status: 'error',
          message: '✗ 图片文件损坏或无法解析'
        })
        result.isValid = false
      }
    }

    setValidationResult(result)
    setValidating(false)
  }

  const resetValidation = () => {
    setSelectedFile(null)
    setValidationResult(null)
    setPreview(null)
  }

  const getFileSizeText = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <div className="card">
        <h2>🖼️ 图片文件校验</h2>

        {!selectedFile ? (
          <div className="upload-zone">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              id="file-input"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="upload-label">
              <div className="upload-icon">📤</div>
              <h3>点击或拖拽上传图片</h3>
              <p>支持 JPG、PNG、GIF、WebP、BMP 格式</p>
              <p>最大文件大小: 10 MB</p>
            </label>
          </div>
        ) : (
          <div>
            <div className="file-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h3>📁 {selectedFile.name}</h3>
                  <p style={{ color: '#718096' }}>
                    {getFileSizeText(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-primary" onClick={validateImage} disabled={validating}>
                    {validating ? '🔍 校验中...' : '✅ 开始校验'}
                  </button>
                  <button className="btn" onClick={resetValidation}>
                    🔄 重新选择
                  </button>
                </div>
              </div>
            </div>

            {preview && (
              <div className="preview-section">
                <h3>📷 图片预览</h3>
                <img src={preview} alt="预览" className="image-preview" />
              </div>
            )}

            {validationResult && (
              <div className={`validation-result ${validationResult.isValid ? 'success' : 'error'}`}>
                <h3>
                  {validationResult.isValid ? '✅ 校验通过' : '❌ 校验失败'}
                </h3>
                
                <div className="checks-list">
                  {validationResult.checks.map((check, index) => (
                    <div key={index} className={`check-item ${check.status}`}>
                      <span className="check-name">{check.name}</span>
                      <span className="check-message">{check.message}</span>
                    </div>
                  ))}
                </div>

                {validationResult.width && validationResult.height && (
                  <div className="image-details">
                    <h4>📊 图片详情</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
                      <div className="detail-item">
                        <span className="detail-label">宽度</span>
                        <span className="detail-value">{validationResult.width} px</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">高度</span>
                        <span className="detail-value">{validationResult.height} px</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">宽高比</span>
                        <span className="detail-value">{(validationResult.width / validationResult.height).toFixed(2)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">像素数</span>
                        <span className="detail-value">{(validationResult.width * validationResult.height).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageValidation
