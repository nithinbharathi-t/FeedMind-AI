import { useState } from 'react';

export default function Responses() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>SUBMISSIONS</div>
          <div className="page-title">Responses</div>
          <div className="page-subtitle">0 total · 0 valid · 0 spam · across 0 forms</div>
        </div>
        <button className="btn btn-ghost btn-sm">↓ Export CSV</button>
      </div>

      <div className="resp-stats">
        {[
          { label: 'Valid', val: 0, color: 'color-cyan' },
          { label: 'Spam', val: 0, color: 'color-yellow' },
          { label: 'Flagged', val: 0, color: 'color-red' },
          { label: 'Positive', val: 0, color: 'color-green' },
          { label: 'Negative', val: 0, color: 'color-red' },
        ].map((s, i) => (
          <div className="resp-stat" key={i}>
            <div className="resp-stat-label">{s.label}</div>
            <div className={`resp-stat-val ${s.color}`}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        {[['all', 'All'], ['valid', 'Valid'], ['spam', 'Spam'], ['flagged', 'Flagged']].map(([id, label]) => (
          <button key={id} className={`forms-tab${activeTab === id ? ' active' : ''}`} style={activeTab === id ? { border: '1px solid var(--purple)' } : {}} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
        <div className="search-bar">
          <input className="search-input" placeholder="Search responses..." />
          <select className="setting-select"><option>All Forms</option></select>
        </div>
      </div>

      <div className="resp-layout">
        <div className="resp-list">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>0 Responses</div>
          <div style={{ fontSize: 13, color: 'var(--text3)' }}>No responses match this filter.</div>
        </div>
        <div className="resp-center">Select a response to view details.</div>
        <div className="resp-sidebar2">
          <div className="resp-side-card">
            <div className="resp-side-title">Sentiment Breakdown</div>
            <div className="resp-side-row"><span>Positive</span><span>0%</span></div>
            <div className="resp-side-row"><span>Negative</span><span>0%</span></div>
            <div className="resp-side-row"><span>Neutral</span><span>0%</span></div>
          </div>
          <div className="resp-side-card">
            <div className="resp-side-title">Responses By Form</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>No forms yet.</div>
          </div>
          <div className="resp-side-card">
            <div className="resp-side-title">Quick Stats</div>
            <div className="resp-side-row"><span>Total responses</span><span>0</span></div>
            <div className="resp-side-row"><span>Integrity alerts</span><span style={{ color: 'var(--yellow)' }}>⊙ 0</span></div>
            <div className="resp-side-row"><span>Filtered view</span><span>0</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
