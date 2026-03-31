const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth.middleware');

// ─── Multer for images ────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/ocr/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error(`Only image files allowed`), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 15 * 1024 * 1024 } }); // 15MB

router.use(protect);

// ─── POST /api/ocr ────────────────────────────────────────
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });

  try {
    // Tesseract.js OCR would run here in production
    // const { createWorker } = require('tesseract.js');
    // const worker = await createWorker();
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');
    // const { data: { text } } = await worker.recognize(req.file.path);
    // await worker.terminate();

    res.json({
      success: true,
      message: 'Image uploaded. OCR processing is configured server-side.',
      file: {
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
      },
      extractedText: '[Connect Tesseract.js or Google Vision API to extract text]',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
