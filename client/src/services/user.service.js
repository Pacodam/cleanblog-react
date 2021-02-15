import http from './http.common';


class UserDataService {

    findByUsernameAndPassword(data) {
       return http.post('/users', data);
    }
}

export default new UserDataService();