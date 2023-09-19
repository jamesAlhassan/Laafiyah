import newRequest from "./newRequest";

const loginUser = async (email, password) => {
    try {
        // login and get the token got from the backend
        const res = await newRequest.post('/auth/login', { email, password });
        // store the result in the localStorage of browser
        localStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (err) {
        console.log(err);
    }
}

export default loginUser;