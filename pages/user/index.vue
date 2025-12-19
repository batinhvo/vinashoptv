<template>
    <div v-if="isLoading" class="fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-50"> 
        <div class="flex space-x-2">
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></span>
        </div>
        <p class="mt-4 text-gray-700 font-medium text-lg">Loading</p>
    </div>

    <div v-else class="container">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><NuxtLink to="/user">My Profile</NuxtLink></li>
          </ul>
        </div>
        <div class="my-10 px-5 xl:px-0">
            <h1 class="text-4xl font-normal pb-10 text-center">My Profile</h1>
            <div class="bg-zinc-100 border border-gray-300 shadow-lg p-2 md:p-5 mt-5 lg:mx-40 xl:mx-60">
                <table class="w-full border border-gray-300 ">                    
                    <tbody class="bg-white shadow-inner" v-if="authStore.authenticated && authStore.userInfo">         
                        <tr class="h-5"><td></td><td></td></tr>                
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Name :</td>
                            <td class="pl-6">{{authStore.userInfo?.firstName + " " + authStore.userInfo?.lastName }}</td>                                                                              
                        </tr>      
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Phone :</td>
                            <td class="pl-6">{{ authStore.userInfo?.phone }}</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Email :</td>
                            <td class="pl-6">{{ authStore.userInfo?.email }}</td>                                                                              
                        </tr>       
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">State :</td>
                            <td class="pl-6">{{ stateName }}</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">City :</td>
                            <td class="pl-6">{{ cityName }}</td>                                                                              
                        </tr>    
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Postcode/Zip :</td>
                            <td class="pl-6">{{ authStore.userInfo?.zip }}</td>                                                                              
                        </tr>  
                        <tr class="h-10">                           
                            <td class="w-2/5 text-right pr-6 font-bold">Street address :</td>
                            <td class="pl-6">{{ authStore.userInfo?.address }}</td>                                                                                                          
                        </tr>  
                        <tr class="h-5"><td></td><td></td></tr>  
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
    definePageMeta({middleware: ['auth-middle']});

    const isLoading = ref(true);

    const authStore = useAuthStore();
    const stateStore = useStateStore();

    /* ---------- FETCH DATA ---------- */
    onMounted(async () => {
        await Promise.all([
            authStore.getInfoUser(),
            stateStore.fetchStates()
        ]);

        setTimeout(() => {
            isLoading.value = false;
        }, 600);
    })

    /* ---------- FETCH CITIES WHEN STATE CHANGES ---------- */
    watch(
        () => authStore.userInfo?.state,
        async (stateCode) => {
            if (stateCode) {
            await stateStore.fetchCities(stateCode)
            }
        },
        { immediate: true }
    )

    /* ---------- COMPUTED DISPLAY ---------- */
    const stateName = computed(() => {
        const stateCode = authStore.userInfo?.state
        return stateStore.states.find(s => s.code === stateCode)?.name || ''
    })

    const cityName = computed(() => {
        const cityId = authStore.userInfo?.cityId
        return stateStore.cities.find(c => c.id === cityId)?.name || ''
    })
</script>

<style lang="css" scoped>
    .title.border-b::after {
        content: ' ';
        height: 2px;
        width: 114px;
        display: block;
        background-color: #20d600;
        position: relative;
        bottom: -1px;
        left: 0;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        /* Ẩn trên Firefox */
        appearance: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>

