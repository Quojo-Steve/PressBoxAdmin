
// check if there is a token from localStorage and ensure that it is not null or undefined and if it is valid
export const isAuthenticated = () => {
    const token = localStorage.getItem('X-Pressbox-Token');
    return token && token !== 'undefined' && token !== 'null' ? true : false;
};

