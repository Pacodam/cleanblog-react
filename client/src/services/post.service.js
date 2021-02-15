//https://shawndsilva.com/blog/web-development/MERN-Sessions-Authentication-App-Part-1-Nodejs-and-Express-Backend.html

import http from "./http.common.js";

class PostDataService {

    getAll() {
      return http.get("/blogposts");
    }

    get(id) {
      return http.get(`/blogposts/${id}`);
    }

    post(data) {
      return http.post('/blogposts', data);
    }
}

export default new PostDataService();