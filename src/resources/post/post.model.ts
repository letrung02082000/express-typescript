import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.inteface';

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<Post>('Post', PostSchema);
