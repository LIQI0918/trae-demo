import { useState, useRef, useEffect } from 'react';

const WatermarkTool = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [fontFamily, setFontFamily] = useState('Microsoft YaHei');
  const [fontSize, setFontSize] = useState(20);
  const [opacity, setOpacity] = useState(25);
  const [rotate, setRotate] = useState(330);
  const [hSpace, setHSpace] = useState(200);
  const [vSpace, setVSpace] = useState(140);
  const [watermarkColor, setWatermarkColor] = useState('#7c7979');
  const [tiled, setTiled] = useState(true);
  const [previewDisabled, setPreviewDisabled] = useState(true);
  const [downloadDisabled, setDownloadDisabled] = useState(true);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const now = new Date()
      .toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\//g, '/');
    setWatermarkText('liqi_rt\n' + now + '\n沙箱空间');
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setPreviewSrc(event.target.result);
        setPreviewDisabled(false);
        generateWatermark(img, event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawMultiLineText = (ctx, lines, x, y, lineHeight) => {
    lines.forEach((line, idx) => {
      ctx.fillText(line, x, y + idx * lineHeight);
    });
  };

  const generateWatermark = (img = originalImage, currentSrc = previewSrc) => {
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const text = watermarkText || '';
    const textLines = text.split('\n').filter((item) => item.trim() !== '');
    const font = fontFamily;
    const size = parseInt(fontSize);
    const opa = parseInt(opacity) / 100;
    const angle = (parseInt(rotate) * Math.PI) / 180;
    const color = watermarkColor;
    const isTiled = tiled;
    const hSpaceVal = parseInt(hSpace);
    const vSpaceVal = parseInt(vSpace);
    const lineHeight = size * 1.3;

    ctx.fillStyle = color;
    ctx.globalAlpha = opa;
    ctx.font = `${size}px ${font}`;
    ctx.textAlign = 'center';

    if (isTiled) {
      let maxTextWidth = 0;
      textLines.forEach((line) => {
        const w = ctx.measureText(line).width;
        if (w > maxTextWidth) maxTextWidth = w;
      });

      const textBlockHeight = lineHeight * textLines.length;

      const tileWidth = maxTextWidth + hSpaceVal;
      const tileHeight = textBlockHeight + vSpaceVal;

      const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      for (let y = -diagonal; y < diagonal; y += tileHeight) {
        const rowIndex = Math.round(y / tileHeight);
        const offsetX = rowIndex % 2 === 0 ? 0 : tileWidth / 2;

        for (let x = -diagonal; x < diagonal; x += tileWidth) {
          ctx.save();
          ctx.translate(x + offsetX, y);

          drawMultiLineText(
            ctx,
            textLines,
            0,
            -((lineHeight * (textLines.length - 1)) / 2),
            lineHeight
          );

          ctx.restore();
        }
      }

      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      drawMultiLineText(
        ctx,
        textLines,
        0,
        -((lineHeight * (textLines.length - 1)) / 2),
        lineHeight
      );
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    const resultSrc = canvas.toDataURL('image/png');
    setPreviewSrc(resultSrc);
    setDownloadDisabled(false);
  };

  const handleDownload = () => {
    if (!originalImage) return;
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = '水印图片_' + new Date().getTime() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleColorSelect = (color) => {
    setWatermarkColor(color);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <style>{`
        .upload-box {
          border: 2px dashed #d1d5db;
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .upload-box:hover {
          border-color: #165DFF;
          background-color: #eff6ff;
        }
        .btn-primary {
          background-color: #165DFF;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: #1553e6;
        }
        .btn-primary:disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
        }
        .btn-success {
          background-color: #10B981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .btn-success:hover:not(:disabled) {
          background-color: #0da573;
        }
        .btn-success:disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
        }
        .card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            <i className="fa fa-picture-o text-blue-600 mr-2"></i>在线图片水印工具
          </h1>
          <p className="text-gray-600 text-lg">
            简单易用，一键为图片添加文字水印，支持自定义样式、多行文字、平铺效果
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fa fa-upload text-blue-600 mr-2"></i>上传图片
              </h3>
              <div
                className="upload-box"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-blue-600', 'bg-blue-50');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('border-blue-600', 'bg-blue-50');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-600', 'bg-blue-50');
                  if (e.dataTransfer.files.length) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(e.dataTransfer.files[0]);
                    fileInputRef.current.files = dataTransfer.files;
                    handleImageUpload({ target: { files: [e.dataTransfer.files[0]] } });
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <i className="fa fa-image text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">点击或拖拽图片到此处</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、WEBP 格式</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fa fa-sliders text-blue-600 mr-2"></i>水印设置
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水印文字（支持换行）
                  </label>
                  <textarea
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="请输入水印文字&#10;支持多行换行"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    字体
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 outline-none"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Microsoft YaHei" selected>微软雅黑</option>
                    <option value="SimSun">宋体</option>
                    <option value="SimHei">黑体</option>
                    <option value="KaiTi">楷体</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    字体大小：<span>{fontSize}</span>px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full"
                    style={{ accentColor: '#165DFF' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    透明度：<span>{opacity}</span>%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                    className="w-full"
                    style={{ accentColor: '#165DFF' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    旋转角度：<span>{rotate}</span>°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotate}
                    onChange={(e) => setRotate(e.target.value)}
                    className="w-full"
                    style={{ accentColor: '#165DFF' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水平间隔：<span>{hSpace}</span>px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    value={hSpace}
                    onChange={(e) => setHSpace(e.target.value)}
                    className="w-full"
                    style={{ accentColor: '#165DFF' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    垂直间隔：<span>{vSpace}</span>px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    value={vSpace}
                    onChange={(e) => setVSpace(e.target.value)}
                    className="w-full"
                    style={{ accentColor: '#165DFF' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水印颜色
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={watermarkColor}
                      onChange={(e) => setWatermarkColor(e.target.value)}
                      className="h-10 w-20 border-0 rounded-lg cursor-pointer"
                    />
                    <div className="flex-1 grid grid-cols-5 gap-1">
                      <button
                        onClick={() => handleColorSelect('#7c7979')}
                        className="w-6 h-6 rounded bg-gray-500 border border-gray-300"
                      ></button>
                      <button
                        onClick={() => handleColorSelect('#000000')}
                        className="w-6 h-6 rounded bg-black border border-gray-300"
                      ></button>
                      <button
                        onClick={() => handleColorSelect('#ffffff')}
                        className="w-6 h-6 rounded bg-white border border-gray-300"
                      ></button>
                      <button
                        onClick={() => handleColorSelect('#ff0000')}
                        className="w-6 h-6 rounded bg-red-500 border border-gray-300"
                      ></button>
                      <button
                        onClick={() => handleColorSelect('#0000ff')}
                        className="w-6 h-6 rounded bg-blue-500 border border-gray-300"
                      ></button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    平铺水印
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tiled}
                      onChange={(e) => setTiled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => generateWatermark()}
                    disabled={previewDisabled}
                    className="btn-primary flex-1 flex items-center justify-center"
                  >
                    <i className="fa fa-eye mr-1"></i>预览效果
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={downloadDisabled}
                    className="btn-success flex-1 flex items-center justify-center"
                  >
                    <i className="fa fa-download mr-1"></i>下载图片
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="card h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fa fa-desktop text-blue-600 mr-2"></i>效果预览
              </h3>
              <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-4 min-h-[400px]">
                <div className="relative max-w-full max-h-full">
                  <img
                    src={previewSrc}
                    className="max-w-full max-h-[500px] rounded shadow-lg"
                    alt="预览图"
                    style={{ display: previewSrc ? 'block' : 'none' }}
                  />
                  {!previewSrc && (
                    <div className="text-center text-gray-400">
                      <i className="fa fa-picture-o text-5xl mb-2"></i>
                      <p>请上传图片并生成水印效果</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-10 text-gray-500 text-sm">
          <p>© 2025 在线图片水印工具 - 纯前端实现，安全可靠</p>
        </footer>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default WatermarkTool;
