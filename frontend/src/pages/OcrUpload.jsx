export default function OcrUpload() {
  return (
    <div className="page">
      <div className="page-title" style={{ marginBottom: 8 }}>OCR Text Extraction</div>
      <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>Upload an image to extract text and automatically clean it up using AI</div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="ocr-drop" onClick={() => alert('Image upload would open here')}>
          <div className="ocr-icon">🖼</div>
          <div className="ocr-title">Upload Image for OCR</div>
          <div className="ocr-sub">Drag and drop your image here, or click to browse</div>
          <div className="ocr-formats">Supported formats: PNG, JPG, JPEG, GIF, BMP</div>
        </div>
      </div>
    </div>
  );
}
