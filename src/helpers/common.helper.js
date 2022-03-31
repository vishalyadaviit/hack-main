export function getStoredUserEmail() {
    const userStorage = localStorage.getItem('user');
    return userStorage ? JSON.parse(userStorage).email : "";
}

export function getStoredUser() {
    const userStorage = localStorage.getItem('user');
    return userStorage ? JSON.parse(userStorage) : {};
}