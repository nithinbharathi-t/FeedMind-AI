export default function Upgrade() {
  const plans = [
    {
      name: 'Free',
      desc: 'Current plan',
      price: '$0',
      period: '/ month',
      features: [
        { ok: true, text: '3 forms' },
        { ok: true, text: '100 responses/month' },
        { ok: true, text: 'Basic analytics' },
        { ok: false, text: 'AI insights' },
        { ok: false, text: 'Export' },
      ],
      btnText: 'Current Plan',
      btnClass: 'btn btn-ghost',
      featured: false,
    },
    {
      name: 'Pro',
      desc: 'Best for growing teams',
      price: '$19',
      period: '/ month',
      badge: 'Popular',
      features: [
        { ok: true, text: 'Unlimited forms' },
        { ok: true, text: '5,000 responses/month' },
        { ok: true, text: 'Advanced analytics' },
        { ok: true, text: 'AI insights & sentiment' },
        { ok: true, text: 'Export (CSV, JSON, PDF)' },
      ],
      btnText: 'Upgrade to Pro',
      btnClass: 'btn btn-purple',
      featured: true,
    },
    {
      name: 'Enterprise',
      desc: 'For large organisations',
      price: 'Custom',
      period: '',
      features: [
        { ok: true, text: 'Unlimited everything' },
        { ok: true, text: 'SSO & SAML' },
        { ok: true, text: 'Custom AI models' },
        { ok: true, text: 'SLA & dedicated support' },
        { ok: true, text: 'On-premise option' },
      ],
      btnText: 'Contact Sales',
      btnClass: 'btn btn-ghost',
      featured: false,
    },
  ];

  return (
    <div className="page">
      <div className="upgrade-hero">
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
        <div className="upgrade-title">Upgrade FeedMind</div>
        <div className="upgrade-sub">Unlock advanced AI analytics, unlimited responses, and priority support</div>
      </div>

      <div className="plan-grid">
        {plans.map((plan, i) => (
          <div key={i} className={`plan-card${plan.featured ? ' featured' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={`plan-name${plan.featured ? ' color-purple' : ''}`}>{plan.name}</div>
              {plan.badge && <div className="badge badge-beta">{plan.badge}</div>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>{plan.desc}</div>
            <div className={`plan-price${plan.featured ? ' color-purple' : ''}`}>{plan.price} <span>{plan.period}</span></div>
            {plan.features.map((f, j) => (
              <div key={j} className="plan-feature" style={!f.ok ? { color: 'var(--text3)' } : {}}>
                <span className={f.ok ? 'check' : ''} style={!f.ok ? { color: 'var(--text3)' } : {}}>{f.ok ? '✓' : '✗'}</span>
                {f.text}
              </div>
            ))}
            <button className={`${plan.btnClass}`} style={{ width: '100%', marginTop: 16 }}>{plan.btnText}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
