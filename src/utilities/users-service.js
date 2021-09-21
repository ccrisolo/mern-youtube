import * as usersAPI from "./users-api";

export async function signUp(userData) {
    try {
        // Delegate the network request code to the users-api.js API module
        // which will ultimately return a JSON Web Token (JWT)
        const token = await usersAPI.signUp(userData);
        //persist the 'token' in browsers local storage
        localStorage.setItem("token", token);
        // Baby step by returning whatever is sent back by the server
        return getUser();
    } catch {
        throw new Error("Invalid Sign Up");
    }
}

export function getToken() {
    //getItem returns null if there's no string
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) return null;
    //check if token expired, remove if it is
    const payload = JSON.parse(atob(token.split(".")[1]));
    //a JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    //If there's a token, return user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
    localStorage.removeItem("token");
}

export async function login(credentials) {
    try {
        const token = await usersAPI.login(credentials);
        //persist the 'token' in browsers local storage
        localStorage.setItem("token", token);
        // Baby step by returning whatever is sent back by the server
        return getUser();
    } catch {
        throw new Error("Invalid credentials");
    }
}

export async function checkToken() {
    return (
        usersAPI
            .checkToken()
            //return a Date object for more flexibility
            .then(dateStr => new Date(dateStr))
    );
}
