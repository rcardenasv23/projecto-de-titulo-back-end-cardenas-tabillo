const loginUser = () => {
    return function login(info: Object) {
        const { email, password } = Object.values(info)[0]
        if (!email) {
            throw new Error('Please enter first Email.');
        }
        if (!password) {
            throw new Error('Please enter Password.');
        }
        return Object.freeze({
            getEmail: () => email,
            getPassword: () => password,
        });
    };
};

export default loginUser;