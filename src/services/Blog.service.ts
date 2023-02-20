import axios, { type AxiosResponse } from "axios";
import { Endpoints } from "@/constants/Endpoints";
import type { Post } from "@/constants/Models";

export class BlogService {
  public async getPosts(): Promise<AxiosResponse<Post[]>> {
    return await axios.get(Endpoints.GET_POSTS);
  }

  public async getPostById(id: number): Promise<AxiosResponse<Post>>{
      return await axios.get(Endpoints.GET_POST_BY_ID.replace("{post}", String(id)));
  }

    public async deletePostById(id: number): Promise<AxiosResponse<Post>>{
        return await axios.delete(Endpoints.DELETE_POST_BY_ID.replace("{post}", String(id)));
    }

  public async putPost(post: Post): Promise<AxiosResponse<Post>>{
    return await axios.put(
      Endpoints.PUT_POSTS.replace("{post}", String(post.id)),
      post,
        {
          headers: {"content-type": "application/json"}
        }
    );
  }
}
