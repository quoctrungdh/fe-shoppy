const mongoose = require('mongoose');
// tạo schema cho collection Color
const ColorSchema = new mongoose.Schema({
  id: { type: 'String', required: true },
  name: { type: 'String', required: true },
  hex: { type: 'String' },
  rgb: { type: 'String' },
  cmy: { type: 'String' },
  cmyk: { type: 'String' },
  userAdded: { type: 'String', required: true },
  userEdited: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateEdited: { type: 'Date', default: Date.now },
});
// đặt tên cho collection
module.exports = mongoose.model('Color', ColorSchema);
