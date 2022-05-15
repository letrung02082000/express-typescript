import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.inteface';

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
