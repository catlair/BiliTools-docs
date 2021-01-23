import form, {createTemplate} from "@/data/form";

const createAccount = createTemplate()

export default {
    temp: {
        createAccount,
        message: {
            form: {
                ...form().message,
            },
            switch: {
                email: false,
                serverChan: false,
            }
        }
    },
    account: {},
    message: {}
}
