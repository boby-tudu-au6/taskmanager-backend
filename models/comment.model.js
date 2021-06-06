import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'task',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  data: {
    type: String,
    required: true,
  },
});

export default model('comment', commentSchema);
