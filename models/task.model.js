import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  data: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'TODO',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default model('task', taskSchema);
