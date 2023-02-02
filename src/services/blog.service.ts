import axios, { type AxiosResponse } from "axios";
import { Endpoints } from "@/constants/endpoints";
import type { Post } from "@/constants/models";

export class BlogService {
  public async posts(): Promise<AxiosResponse<Post[]>> {
    return await axios.get(Endpoints.GET_POSTS);
  }
}
