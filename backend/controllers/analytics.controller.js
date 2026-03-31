const Response = require('../models/Response.model');
const Form = require('../models/Form.model');

// ─── GET /api/analytics/overview ─────────────────────────
exports.getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = period === '7d' ? 7 : period === '90d' ? 90 : period === 'all' ? 3650 : 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [totalForms, publishedForms, draftForms, totalResponses, validResponses, spamResponses] =
      await Promise.all([
        Form.countDocuments({ owner: userId }),
        Form.countDocuments({ owner: userId, status: 'published' }),
        Form.countDocuments({ owner: userId, status: 'draft' }),
        Response.countDocuments({ owner: userId, createdAt: { $gte: since } }),
        Response.countDocuments({ owner: userId, status: 'valid', createdAt: { $gte: since } }),
        Response.countDocuments({ owner: userId, status: 'spam', createdAt: { $gte: since } }),
      ]);

    const sentimentCounts = await Response.aggregate([
      { $match: { owner: req.user._id, createdAt: { $gte: since } } },
      { $group: { _id: '$sentiment', count: { $sum: 1 } } },
    ]);

    const deviceCounts = await Response.aggregate([
      { $match: { owner: req.user._id, createdAt: { $gte: since } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
    ]);

    const avgCompletionTime = await Response.aggregate([
      { $match: { owner: req.user._id, createdAt: { $gte: since } } },
      { $group: { _id: null, avg: { $avg: '$completionTime' } } },
    ]);

    res.json({
      success: true,
      data: {
        forms: { total: totalForms, published: publishedForms, drafts: draftForms },
        responses: { total: totalResponses, valid: validResponses, spam: spamResponses },
        sentiment: sentimentCounts.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
        devices: deviceCounts.reduce((acc, d) => ({ ...acc, [d._id]: d.count }), {}),
        avgCompletionTime: avgCompletionTime[0]?.avg || 0,
        avgPerForm: totalForms > 0 ? Math.round(totalResponses / totalForms) : 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/analytics/trends ────────────────────────────
exports.getTrends = async (req, res) => {
  try {
    const { period = '30d', formId } = req.query;
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const match = { owner: req.user._id, createdAt: { $gte: since } };
    if (formId) match.form = formId;

    const trends = await Response.aggregate([
      { $match: match },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, trends });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
