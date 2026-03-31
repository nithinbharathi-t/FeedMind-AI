import { useState } from 'react';

const chartHeights = [8,5,10,7,12,6,9,8,11,7,9,10,6,8,10,12,7,9,8,10,6,9,7,11,9,8,10,6,9,10];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>DATA INTELLIGENCE</div>
          <div className="page-title">Analytics</div>
          <div className="page-subtitle">Deep insights across your forms – Last {timeRange}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm">All Forms ▾</button>
          <button className="btn btn-ghost btn-sm">↓ Export</button>
          <button className="btn btn-purple btn-sm">✦ AI Insights</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['7d', '30d', '90d', 'All'].map(t => (
          <button key={t} className={`time-tab${timeRange === t ? ' active' : ''}`} onClick={() => setTimeRange(t)}>{t}</button>
        ))}
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>≡ All forms</button>
      </div>

      <div className="analytics-stats">
        {[
          { label: '👁 Total Views', val: '0', sub: '↗ vs last period', subColor: 'color-cyan' },
          { label: '◻ Responses', val: '0', sub: '↗ active collection', subColor: 'color-cyan' },
          { label: '👤 Completion', val: '0%', sub: '↘ needs tuning', subColor: 'color-red' },
          { label: '⏱ Avg Time', val: '0:00', sub: '↗ faster than before', subColor: 'color-cyan' },
          { label: '📊 NPS', val: '0', sub: '↗ score quality', subColor: 'color-cyan' },
        ].map((s, i) => (
          <div className="a-stat" key={i}>
            <div className="a-stat-label">{s.label}</div>
            <div className={`a-stat-val${i === 1 || i === 2 ? ' color-cyan' : i === 3 ? ' color-yellow' : ''}`}>{s.val}</div>
            <div className={`a-stat-sub ${s.subColor}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="analytics-row">
        <div className="card">
          <div className="perf-title">Response Volume Over Time</div>
          <div className="chart-dots" style={{ height: 120 }}>
            {chartHeights.map((h, i) => <div key={i} className="chart-dot" style={{ height: `${h}%` }}></div>)}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 11, color: 'var(--text2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }}></span>Responses</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }}></span>Views</span>
          </div>
        </div>
        <div className="card">
          <div className="perf-title">Conversion Funnel</div>
          {[
            { label: 'Viewed', width: 100, val: 0, color: 'linear-gradient(90deg,var(--purple),var(--cyan))' },
            { label: 'Started', width: 3, val: 0, color: 'var(--purple)' },
            { label: 'Q1', width: 3, val: 0, color: 'var(--purple)' },
            { label: 'Halfway', width: 3, val: 0, color: 'var(--purple)' },
            { label: 'Submitted', width: 3, val: 0, color: 'var(--green)' },
            { label: 'Valid', width: 3, val: 0, color: 'var(--green)' },
          ].map((row, i) => (
            <div className="funnel-row" key={i} style={{ marginBottom: 10 }}>
              <div className="funnel-label" style={{ width: 70 }}>{row.label}</div>
              <div className="funnel-track"><div className="funnel-fill" style={{ width: `${row.width}%`, background: row.color }}></div></div>
              <div className="funnel-val">{row.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-grid2">
        <div className="card">
          <div className="perf-title">Sentiment</div>
          <div className="resp-side-row" style={{ marginTop: 8 }}><span>Positive</span><span>0%</span></div>
          <div className="resp-side-row"><span>Neutral</span><span>0%</span></div>
          <div className="resp-side-row"><span>Negative</span><span>0%</span></div>
        </div>
        <div className="card">
          <div className="perf-title">Completion By Form</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>No data yet.</div>
        </div>
        <div className="card">
          <div className="perf-title">Devices</div>
          <div style={{ marginTop: 12 }}>
            {[
              { label: 'Mobile', pct: 100, color: 'var(--cyan)' },
              { label: 'Desktop', pct: 0, color: 'var(--purple)' },
              { label: 'Tablet', pct: 0, color: 'var(--yellow)' },
            ].map((d, i) => (
              <div className="device-row" key={i}>
                <div className="device-label-row"><span>{d.label}</span><span className={d.pct === 100 ? 'color-cyan' : ''}>{d.pct}%</span></div>
                <div className="device-track"><div className="device-fill" style={{ width: `${d.pct}%`, background: d.color }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="perf-title">Activity Heatmap</div>
          <div className="hm-labels" style={{ marginTop: 8 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} className="hm-day-label">{d}</div>)}
          </div>
          <div className="heatmap">
            {Array(21).fill(0).map((_, i) => <div key={i} className="hm-cell"></div>)}
          </div>
        </div>
      </div>

      <div className="analytics-grid3" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="perf-title">Question Drop-off Analysis</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>No question data yet.</div>
        </div>
        <div className="card">
          <div className="perf-title">Response Time Distribution</div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
            {[40, 60, 80, 100, 70, 50, 30].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'var(--cyan)', opacity: 0.4 + (i * 0.1), borderRadius: 3, height: `${h}%` }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 8 }}>Peak Mon - 00:00-01:00</div>
        </div>
        <div className="card">
          <div className="perf-title">✦ AI Insights</div>
          <div className="ai-insight-card alert-card" style={{ marginTop: 12 }}>
            <div className="ai-insight-title">⚠ Drop-off risk detected</div>
            <div className="ai-insight-body">Collect more responses to detect drop-off hotspots.</div>
            <div className="ai-insight-tag">⊙ Actionable signal</div>
          </div>
          <div className="ai-insight-card good-card">
            <div className="ai-insight-title">🕐 Best launch window</div>
            <div className="ai-insight-body">Strong engagement appears around Mon 00:00–01:00. Scheduling form pushes before this window should improve completion.</div>
            <div className="ai-insight-tag">⊙ Actionable signal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
