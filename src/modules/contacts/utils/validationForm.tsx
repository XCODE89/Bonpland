export const validateForm = (name: string, email: string, phone: string, message: string) => {
    if (!name || !email || !phone || !message) {
        return false;
    }
    return true;
}