<template>
    <div class="relative inline-block">
        <button @click="toggleMenu" class="btn btn-primary bg-primary px-6 py-3 flex items-center font-bold w-[270px] rounded-t-lg">
            <i class="fa fa-list-ul mr-2"></i> All Departments
        </button>

        <div :class="[
            'list-menu bg-white shadow-lg rounded-b-lg w-[270px] z-40', 
            isOverflowHidden ? 'overflow-hidden' : '', 
            isMenuOpen ? 'show' : ''
        ]">
            <ul class="p-2 relative">
                <li class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                    <NuxtLink class="flex justify-between items-center hover:text-black font-bold" to="/categories/saleoff">
                        Sale Off
                    </NuxtLink>                    
                </li>
                <MenuContentMenuHeader 
                v-for="(cate, index) in dataCategories" 
                :key="index" 
                :cate="cate"  
                />               
            </ul>
        </div>
   
    </div>
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";
 
    const route = useRoute(); //lay thong tin route hien tai
    const isMenuOpen = ref(route.path === "/");
    const isOverflowHidden = ref(false);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }

    watch(isMenuOpen, async (newValue) => {
        if (newValue) {
            isOverflowHidden.value = true;
            await nextTick(); // Chờ Vue cập nhật DOM
            
            setTimeout(() => {
                isOverflowHidden.value = false;
            }, 1000);
        } else {
            isOverflowHidden.value = true;
        }
    });

    watch(() => route.path, (newPath) => {
        isMenuOpen.value = newPath === "/";
    });

    //----------------------------------API---------------------------------------//
    const dataCategories = ref<Category[]>([]);

    const cateStore = useCateStore();
    dataCategories.value = await cateStore.getCategories();
    

</script>

<style lang="css" scoped>
    button {
        outline: none;
    }

    .list-menu {
        position: absolute;
        max-height: 0;
        opacity: 0;
        transition: max-height .6s ease-in-out, opacity 1.2s ease-in-out;
    }

    .list-menu.show {
        max-height: 340px;
        opacity: 1;
        transition: max-height .5s ease-in-out, opacity .5s ease-in-out;
    }

</style>
