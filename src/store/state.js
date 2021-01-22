import form from "@/data/form";

export default {
    template: {
        ...form(),
        switch: {
            addCoins: true,
            scf: false,
            message: {
                use: false,
                email: {
                    use: false,
                    custom: false
                },
                serverChan: {
                    use: false,
                    custom: false
                }
            }
        }
    },
    account: [],
    message: {
        form: {
            ...form().message
        },
        switch: {}
    }
}
