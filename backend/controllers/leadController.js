const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error finding leads' });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error finding lead' });
  }
};

// @desc    Create new lead (e.g. from public contact form)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  const { name, email, source, message } = req.body;

  try {
    const notes = message ? [{ text: message }] : [];
    
    const lead = new Lead({
      name,
      email,
      source: source || 'Website',
      notes
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    res.status(400).json({ message: 'Invalid lead data' });
  }
};

// @desc    Update lead (status or add note)
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  const { status, text } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (status) lead.status = status;
      if (text) lead.notes.push({ text });

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating lead' });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await lead.deleteOne();
      res.json({ message: 'Lead removed' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting lead' });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
