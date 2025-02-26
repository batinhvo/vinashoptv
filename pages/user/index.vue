<template>
    <div class="container">
        <div class="mt-0 md:mt-10">
          <ul class="flex items-center bg-zinc-100 md:bg-white pl-2 xl:pl-0">
            <li class="px-3 py-2 hover:bg-zinc-100 rounded hover:border hover:border-gray-200"><a href="/">Home</a></li>
            <li class="px-2"><i class="ec ec-arrow-right-categproes"></i></li>
            <li class="px-3 py-2 md:bg-zinc-100 hover:bg-gray-200 rounded md:border md:border-gray-100"><a href="/user">My Profile</a></li>
          </ul>
        </div>
        <div class="my-10 px-5 xl:px-0">
            <h1 class="text-4xl font-normal pb-10 text-center">My Profile</h1>
            <div class="bg-zinc-100 border border-gray-300 shadow-lg p-2 md:p-5 mt-5 lg:mx-40 xl:mx-60">
                <table class="w-full border border-gray-300 ">                    
                    <tbody class="bg-white shadow-inner" v-if="authStore.authenticated">         
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
    definePageMeta({middleware: 'auth-middle'});

    const authStore = useAuthStore();
    const stateStore = useStateStore();

    const stateName = computed(() => stateStore.states.find((state) => state.code === authStore.userInfo?.state)?.name);
    const cityName = computed(() => stateStore.cities.find((city) => city.id === authStore.userInfo?.cityId)?.name);

    const fetchInfomationUser = async () => {
        await authStore.getInfoUser();
        await stateStore.fetchStates();  
        await stateStore.fetchCities(authStore.userInfo?.state || '');
    }

    fetchInfomationUser();
</script>

