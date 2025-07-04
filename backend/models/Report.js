const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mediaUrl: { type: String, default: '' },
  liveLocationLink: { type: String, default: '' },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    address: { type: String, default: '' },
  },
  timestamp: { type: Date, default: Date.now },
  reportType: { type: String, required: true }, // New reportType field
});

module.exports = mongoose.model('Report', ReportSchema);
