const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  price: Number,
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isDonated: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
