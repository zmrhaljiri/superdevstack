// Initialization of Vanilla JS components

export default {
    single: (Component, container, ...args) => {
        try {
            if (container) {
                return new Component(container, ...args)
            }
        } catch (e) {
            console.error(e)
        }
    },
    multiple: (Component, containers, ...args) => {
        try {
            return [...containers].map(
                container => new Component(container, ...args)
            )
        } catch (e) {
            console.error(e)
        }
    },
}
