export const bodyScroll = {
    refs: {
        container: document.querySelector('html'),
    },

    off(){
        this.refs.container.classList.add("no-scroll");
    },

    on(){
        this.refs.container.classList.remove("no-scroll");
    }
}