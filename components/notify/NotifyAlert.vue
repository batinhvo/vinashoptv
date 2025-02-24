<template>
    <div v-if="isVisible" class="fixed top-5 right-5 z-50 ml-5" :class="[{ 'is-exiting': isExiting }]">
        <div class="border px-4 py-3 rounded shadow-md flex items-center justify-between alert-content" :class="alertTypeClass" role="alert">
            <i :class="alertIconClass" aria-hidden="true"></i>
            <strong class="font-bold">{{ message }}</strong>
            <span class="top-0 bottom-0 right-0 ml-4 px-1" @click="close">
                <i class="fill-current hover:font-bold ec ec-close-remove" :class="alertButtonClass" role="button"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from "vue";

    export default defineComponent({
        name: "NotifyAlert",
        props: {
            message: {
                type: String,
                default: "You won the lottery.",
            },
            type: {
                type: String,
                default: "info", 
                validator: (value: string) => ["info", "success", "error", "Warning"].includes(value),
            },
            time: {
                type: Number,
                default: 3000,
            }
        },
        setup(props) {
            const isVisible = ref(true);
            const isExiting = ref(false);

            const close = () => {
                isExiting.value = true;               
                setTimeout(() => {
                    isVisible.value = false;
                }, 500); 
            };

            if (props.time > 0) {
                setTimeout(() => {
                    close();
                }, props.time);
            }

            // alert color
            const alertTypeClass = computed(() => {
                switch (props.type) {
                    case "success":
                    return "bg-green-100 border-green-400 text-green-700";
                    case "error":
                    return "bg-red-100 border-red-400 text-red-700";
                    case "warning":
                    return "bg-yellow-100 border-yellow-400 text-yellow-700";
                    case "info":
                    default:
                    return "bg-blue-100 border-blue-400 text-blue-700";
                }
            });
            // icon notify
            const alertIconClass = computed(() => {
                switch (props.type) {
                    case "success":
                    return "fa fa-check-circle pr-2 text-green-700";
                    case "error":
                    return "fa fa-times-circle pr-2 text-red-700";
                    case "warning":
                    return "fa fa-exclamation-triangle pr-2 text-yellow-700";
                    case "info":
                    default:
                    return "fa fa-info-circle pr-2 text-blue-700";
                }
            });
            // button color
            const alertButtonClass = computed(() => {
                switch (props.type) {
                    case "success":
                    return "text-green-500 hover:text-green-700";
                    case "error":
                    return "text-red-500 hover:text-red-700";
                    case "warning":
                    return "text-yellow-500 hover:text-yellow-700";
                    case "info":
                    default:
                    return "text-blue-500 hover:text-blue-700";
                }
            });

            return { isVisible, isExiting, close, alertTypeClass, alertIconClass, alertButtonClass };
        },
    });
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }

    /* Open */
    .alert-content {
        animation: slideStart 0.5s ease-out;
    }

    /* Close */
    .is-exiting .alert-content {
        animation: slideEnd 0.5s ease-in forwards;
    }

    @keyframes slideStart {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideEnd {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

</style>