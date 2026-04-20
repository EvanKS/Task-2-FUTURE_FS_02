const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLeads).post(createLead); // Create lead is public (for contact forms)
router
  .route('/:id')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

module.exports = router;
