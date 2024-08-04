import mongoose from 'mongoose';

const Broad = new mongoose.model('broad', new mongoose.Schema({
  title: String,
  description: String,
  background: String,
  columns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'column'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
}, { collection: 'broads' }));

export { Broad };