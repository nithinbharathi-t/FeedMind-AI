const express = require('express');
const router = express.Router();
const {
  getResponses,
  submitResponse,
  getResponse,
  deleteResponse,
  updateResponseStatus,
  exportResponses,
} = require('../controllers/response.controller');
const { protect } = require('../middleware/auth.middleware');

// Public – form submission
router.post('/submit', submitResponse);

// Protected
router.use(protect);
router.get('/', getResponses);
router.get('/export', exportResponses);
router.get('/:id', getResponse);
router.delete('/:id', deleteResponse);
router.patch('/:id/status', updateResponseStatus);

module.exports = router;
