//https://shawndsilva.com/blog/web-development/MERN-Sessions-Authentication-App-Part-1-Nodejs-and-Express-Backend.html

import http from "./http.common.js";

class PostDataService {

    getAll() {
      return http.get("/posts");
    }

    get(id) {
      return http.get(`/posts/${id}`);
    }

    getByUserId(userId) {
      return http.get(`/posts/user-posts/${userId}`);
    }

    post(data) {
      return http.post('/posts', data);
    }
}

export default new PostDataService();