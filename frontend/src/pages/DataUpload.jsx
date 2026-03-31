export default function DataUpload() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Data Upload</div>
          <div className="page-subtitle">Upload CSV or JSON files to analyze your existing feedback data</div>
        </div>
      </div>

      <div className="data-upload-area" onClick={() => alert('File upload would open here')}>
        <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>📂</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Upload Data File</div>
        <div style={{ fontSize: 13, color: 'var(--text2)' }}>Drag and drop your file here, or click to browse</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6 }}>Supported formats: CSV, JSON, XLSX</div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="perf-title">Uploaded Files</div>
        <div style={{ textAlign: 'center', padding: 24, color: 'var(--text3)', fontSize: 13 }}>No files uploaded yet. Upload a file to start analyzing your data.</div>
      </div>
    </div>
  );
}
