function FortalezaPassword({ password }) {

    let nivel = "Débil";

    if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password)
    ) {
        nivel = "Intermedia";
    }

    if (
        password.length >= 10 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    ) {
        nivel = "Fuerte";
    }

    return (
        <div>
            Fortaleza: {nivel}
        </div>
    );
}

export default FortalezaPassword;