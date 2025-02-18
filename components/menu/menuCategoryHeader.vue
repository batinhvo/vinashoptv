<template>
    <div class="relative inline-block">
        <button @click="toggleMenu" class="btn btn-primary bg-primary px-6 py-3 flex items-center font-bold w-[270px] rounded-t-lg">
            <i class="fa fa-list-ul mr-2"></i> All Departments
        </button>

        <div ref="menuDropDown" class="absolute z-40">
            <Transition name="dropdown">
                <div v-show="isMenuOpen" class="bg-white shadow-lg rounded-b-lg w-[270px]">
                    <ul class="p-2 relative">
                        <li class="border-b py-1.5 px-4 hover:bg-neutral-100 cursor-pointer relative">
                            <NuxtLink class="flex justify-between items-center hover:text-black font-bold" to="/categories/saleoff">
                                Sale Off
                            </NuxtLink>                    
                        </li>
                        <MenuContentMenuHeader 
                        v-for="(cate, index) in dataCatePro" 
                        :key="index" 
                        :cate="cate"  
                        />               
                    </ul>
                </div>
            </Transition>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { type Category } from "types/categoryTypes";
 
    const route = useRoute(); //lay thong tin route hien tai
    const isMenuOpen = ref(route.path === "/");

    const menuDropDown = ref<HTMLElement | null>(null);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;

        menuDropDown.value?.classList.add('overflow-hidden');
        setTimeout(() => {
            menuDropDown.value?.classList.remove('overflow-hidden')
        },600)
    }

    watch(() => route.path, (newPath) => {
        isMenuOpen.value = newPath === "/";

        menuDropDown.value?.classList.add('overflow-hidden');
        setTimeout(() => {
            menuDropDown.value?.classList.remove('overflow-hidden')
        },600)
    });

    //----------------------------------API---------------------------------------//
    const dataCategories = ref<Category[]>([]);
    const dataCatePro = ref<Category[]>([]);

    const cateStores = useCateStore();

    const fetchCateData = async () => {
        await cateStores.fetchCategories();
        dataCategories.value = cateStores.categories || [];

        dataCatePro.value = dataCateProcessing(dataCategories.value);
    };

    const dataCateProcessing = (dataCate: Category[]): Category[] => {
        const parentCate: Category[] = [];
        const categoryMap = new Map<number, Category>(); // Map of category

        // Gán từng danh mục vào Map
        dataCate.forEach((cate) => {
            categoryMap.set(cate.id, {...cate, children: [] });
        });

        //Gán các phần tử con vào đúng cha
        dataCate.forEach((cate) => {
            if (cate.parentId === 0) {
                parentCate.push(categoryMap.get(cate.id)!);
            } else {
                const parent = categoryMap.get(cate.parentId);
                if (parent) {
                    parent.children?.push(categoryMap.get(cate.id)!);
                }
            }
        });

        // Sắp xếp danh mục theo `sort`
        const sortCategories = (categories: Category[]): Category[] => {
            return categories
            .sort((a, b) => a.sort - b.sort)
            .map((cate) => ({
                ...cate,
                children: cate.children ? sortCategories(cate.children) : [],
            }));
        };

        return sortCategories(parentCate);
    }
    fetchCateData();

</script>

<style lang="css" scoped>
    button {
        outline: none;
    }

    /* Hiệu ứng sổ xuống */
    .dropdown-enter-active, .dropdown-leave-active {
        transition: max-height 0.6s ease-in-out, opacity 0.2s;
        max-height: 300px; /* Độ cao tối đa */
        opacity: 1;
    }
    .dropdown-enter-from, .dropdown-leave-to {
        max-height: 0;
        opacity: 0;
    }

    .menu {
        opacity: 0;
        animation: fadeLeftEffect .5s ease-out forwards; 
    }

    .menu.show {
        opacity: 1;
        animation: fadeRightEffect .5s ease-out forwards; 
    }

    @keyframes fadeUpEffect {
        from {
            opacity: 1;
            transform: translateX(0px);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }

    @keyframes fadeDownEffect {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }

</style>