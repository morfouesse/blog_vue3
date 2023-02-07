import axios, { type AxiosResponse } from "axios";
import { Endpoints } from "@/constants/endpoints";
import type { Post } from "@/constants/models";

export class BlogService {
  public async getPosts(): Promise<AxiosResponse<Post[]>> {
    return await axios.get(Endpoints.GET_POSTS);
  }

  public async putPost(post: Post): Promise<AxiosResponse<Post>>{
    return await axios.put(
      Endpoints.PUT_POSTS.replace("{post}", String(post.id)),
      post
    );
  }
}
