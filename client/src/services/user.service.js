import http from './http.common';


class UserDataService {

    //TODO for now we will use auth.service
    login(data) {
       return http.post('/auth/signin', data);
    }

    // login(data) {
    //     return http.post('/users', data);
    //  }
}

export default new UserDataService();