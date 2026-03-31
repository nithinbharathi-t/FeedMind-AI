import { useState } from 'react';

const qTypes = ['Short Text', 'Long Text', 'Multiple Choice', 'Checkbox', 'Rating', 'NPS', 'Dropdown', 'Date'];
const typeIcons = { 'Short Text': 'T', 'Long Text': '¶', 'Multiple Choice': '◎', 'Checkbox': '☑', 'Rating': '★', 'NPS': '📊', 'Dropdown': '▾', 'Date': '📅' };

function QuestionCard({ question, onDelete, onCycleType }) {
  const isChoice = ['Multiple Choice', 'Checkbox', 'Dropdown'].includes(question.type);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="question-card">
      <div className="q-header">
        <div className="q-type-badge" onClick={() => onCycleType(question.id)}>
          {typeIcons[question.type] || 'T'} {question.type} ▾
        </div>
        {isChoice && <span style={{ fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>+ Add Others</span>}
        <div className="q-required">
          Required
          <div className={`toggle${toggled ? ' on' : ''}`} onClick={() => setToggled(!toggled)}></div>
        </div>
        <div className="q-actions">
          <button className="q-action-btn" title="Duplicate">⧉</button>
          <button className="q-action-btn" onClick={() => onDelete(question.id)} title="Delete">✕</button>
        </div>
      </div>
      <input className="q-input" defaultValue={question.text} placeholder={`${question.num}. Write a question...`} />
      {isChoice && (
        <>
          <div className="q-option"><div className="q-option-circle"></div><input className="q-option-input" placeholder="Option 1" /></div>
          <div className="q-option"><div className="q-option-circle"></div><input className="q-option-input" placeholder="Option 2" /></div>
        </>
      )}
    </div>
  );
}

export default function FormBuilder({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [activePanel, setActivePanel] = useState('settings');
  const [aiPrompt, setAiPrompt] = useState('');
  const [formTitle, setFormTitle] = useState('Untitled form');

  const addQuestion = (type = 'Short Text', text = '') => {
    const num = counter + 1;
    setCounter(num);
    setQuestions(prev => [...prev, { id: Date.now(), num, type, text }]);
  };

  const deleteQuestion = (id) => setQuestions(prev => prev.filter(q => q.id !== id));

  const cycleType = (id) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== id) return q;
      const idx = qTypes.indexOf(q.type);
      return { ...q, type: qTypes[(idx + 1) % qTypes.length] };
    }));
  };

  const addAIQuestion = (type) => {
    const presets = {
      NPS: { t: 'Multiple Choice', q: 'How likely are you to recommend us to a friend or colleague?' },
      wait: { t: 'Rating', q: 'How would you rate your wait time experience?' },
      email: { t: 'Short Text', q: 'What is your email address so we can follow up?' },
    };
    if (type === 'more') {
      ['How satisfied are you with our service?', 'What could we improve?', 'Would you use our product again?', 'How did you hear about us?', 'Any additional comments?']
        .forEach(q => addQuestion('Short Text', q));
      return;
    }
    const p = presets[type];
    if (p) addQuestion(p.t, p.q);
  };

  const sendAIPrompt = () => {
    const txt = aiPrompt.trim();
    if (!txt) return;
    addQuestion('Short Text', txt + '?');
    setAiPrompt('');
  };

  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(true);
  const [s3, setS3] = useState(false);
  const [s4, setS4] = useState(true);
  const [s5, setS5] = useState(true);
  const [s6, setS6] = useState(false);

  return (
    <div className="builder-wrapper">
      <div className="builder-header">
        <button className="builder-back" onClick={onBack}>← Dashboard</button>
        <input className="form-title-input" value={formTitle} onChange={e => setFormTitle(e.target.value)} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">💾 Save</button>
          <button className="btn btn-primary btn-sm">🌐 Publish</button>
        </div>
      </div>

      <div className="builder-layout" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="builder-canvas">
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <input className="form-title-input" defaultValue="Untitled form" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, display: 'block', width: '100%' }} />
            <input className="form-title-input" placeholder="Add a description (optional)..." style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24, display: 'block', width: '100%' }} />

            {questions.map(q => (
              <QuestionCard key={q.id} question={q} onDelete={deleteQuestion} onCycleType={cycleType} />
            ))}

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button className="add-q-btn" onClick={() => addQuestion()}>+ Add Question</button>
            </div>
          </div>
        </div>

        <div className="builder-panel">
          <div className="panel-tabs">
            <div className={`panel-tab${activePanel === 'settings' ? ' active' : ''}`} onClick={() => setActivePanel('settings')}>⚙ Form Settings</div>
            <div className={`panel-tab${activePanel === 'ai' ? ' active' : ''}`} onClick={() => setActivePanel('ai')}>✦ AI Suggestion</div>
          </div>

          {activePanel === 'settings' && (
            <div className="panel-body">
              <div className="setting-section">
                <div className="setting-label">Respondents</div>
                <div className="setting-row"><span className="setting-name">Multiple responses</span><div className={`toggle${s1 ? ' on' : ''}`} onClick={() => setS1(!s1)}></div></div>
                <div className="setting-row">
                  <span className="setting-name">Collect email</span>
                  <select className="setting-select"><option>Do not collect</option><option>Optional</option><option>Required</option></select>
                </div>
                <div className="setting-row"><span className="setting-name">Show progress bar</span><div className={`toggle${s2 ? ' on' : ''}`} onClick={() => setS2(!s2)}></div></div>
                <div className="setting-row"><span className="setting-name">Shuffle questions</span><div className={`toggle${s3 ? ' on' : ''}`} onClick={() => setS3(!s3)}></div></div>
              </div>
              <div className="setting-section">
                <div className="setting-label">Integrity and Spam</div>
                <div className="setting-row"><span className="setting-name">Restrict extension</span><div className={`toggle${s4 ? ' on' : ''}`} onClick={() => setS4(!s4)}></div></div>
              </div>
              <div className="setting-section">
                <div className="setting-label">Notifications</div>
                <div className="setting-row"><span className="setting-name">Email on submission</span><div className={`toggle${s5 ? ' on' : ''}`} onClick={() => setS5(!s5)}></div></div>
                <div className="setting-row"><span className="setting-name">Slack webhook</span><div className={`toggle${s6 ? ' on' : ''}`} onClick={() => setS6(!s6)}></div></div>
              </div>
              <div className="setting-section">
                <div className="setting-label">Appearance</div>
                <div style={{ fontSize: 13, marginBottom: 4 }}>Thank you message</div>
                <textarea className="setting-textarea" defaultValue="Thank you for your feedback! We really appreciate it."></textarea>
                <div style={{ fontSize: 13, marginTop: 12, marginBottom: 4 }}>Redirect URL</div>
                <input className="setting-input" placeholder="https://yoursite.com/thanks" />
              </div>
            </div>
          )}

          {activePanel === 'ai' && (
            <div className="panel-body">
              <div className="ai-panel">
                <div className="ai-bubble">Hi! I can help you generate questions. What is your survey about?</div>
                <div className="provider-row">
                  <div className="provider-label">Provider</div>
                  <select className="setting-select" style={{ width: '100%' }}>
                    <option>Gemini</option>
                    <option>Claude</option>
                    <option>GPT-4</option>
                  </select>
                </div>
                <div className="quick-prompts-label">Quick Prompts</div>
                <div className="quick-prompts">
                  <button className="qp-btn" onClick={() => addAIQuestion('NPS')}>Add NPS question</button>
                  <button className="qp-btn" onClick={() => addAIQuestion('wait')}>Ask about wait time</button>
                  <button className="qp-btn" onClick={() => addAIQuestion('email')}>Add email follow-up</button>
                  <button className="qp-btn" onClick={() => addAIQuestion('more')}>Generate 5 more questions</button>
                </div>
                <div className="ai-input-row">
                  <input className="ai-input" placeholder="e.g. Add a question about pricing." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendAIPrompt()} />
                  <button className="ai-send" onClick={sendAIPrompt}>➤</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
