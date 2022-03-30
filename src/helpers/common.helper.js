export function getUserEmail() {
    const userStorage = localStorage.getItem('user');
    return userStorage ? JSON.parse(userStorage).email : "";
}