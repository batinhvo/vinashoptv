import { createApp, h } from "vue";
import NotifyAlert from "~/components/notify/NotifyAlert.vue";

interface NotifyOptions {
    message: string;
    type?: "info" | "warning" | "error" | "success";
    time?: number;
}

export const useNotify = () => {
    return ({ message, type = "info" , time = 3000}: NotifyOptions) => {
        const container = document.createElement("div");
        document.getElementById("notify-alert")?.appendChild(container);

        const app = createApp({
            data() {
                return { isVisible: true };
            },
            methods: {
                handleClose() {
                    this.isVisible = false;
                    setTimeout(() => {
                        app.unmount();
                        container.remove();
                    }, 500);
                },
            },
            mounted() {
                if (time > 0) {
                    setTimeout(this.handleClose, time);
                }
            },
            render() {
                return this.isVisible ? h(NotifyAlert, {message, type, time, onClose: this.handleClose,}) : null;
            },
        });

        app.mount(container);
    };
};