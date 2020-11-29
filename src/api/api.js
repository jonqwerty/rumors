import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "api-key": "59e559f3-c48c-45df-865e-82e51afdf429"
    }
});

export const usersAPI = {
    getUsers(currentPage=1, pageSize=10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
       return instance.delete(`follow/${userId}`)
    },
    getProfile (userId) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);    
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/`+ userId);       
    },
    getStatus(userId) {
        return instance.get(`profile/status/`+ userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{status: status});
    }
}

export const authAPI = {
    me( ) {
        return instance.get(`auth/me`)
    }
}


