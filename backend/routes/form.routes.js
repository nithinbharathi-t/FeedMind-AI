const express = require('express');
const router = express.Router();
const {
  getForms,
  createForm,
  getForm,
  updateForm,
  deleteForm,
  publishForm,
  getFormByShareLink,
} = require('../controllers/form.controller');
const { protect } = require('../middleware/auth.middleware');

// Public route (for respondents)
router.get('/share/:shareLink', getFormByShareLink);

// Protected routes (for form owners)
router.use(protect);
router.get('/', getForms);
router.post('/', createForm);
router.get('/:id', getForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);
router.patch('/:id/publish', publishForm);

module.exports = router;
