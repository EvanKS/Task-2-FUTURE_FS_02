const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: 'Website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new',
    },
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
