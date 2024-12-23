<template>
    <div class="flex flex-wrap relative my-5">
        <div v-for="(item, index) in products" :key="index" class="w-1/2 md:w-1/4 py-4 mb-4 hover:shadow-[0_0_6px_0_rgba(1,1,1,0.3)]">
            <div class="mb-2 px-6">
                <NuxtLink class="text-xs">{{ item.cate }}</NuxtLink>
            </div>
            <div :class="['px-6', { 'border-l border-gray-200': index % columns !== 0 }]">
                <div class="relative group">
                    <button>
                        <NuxtImg class="w-full" :src="item.image" :alt="item.title"/>
                    </button>
                    <div class="pop-up">
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300">
                            Quick View
                        </button>
                        <button class="btn text-black bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] hover:-translate-y-1 duration-300 mt-6">
                            See Details
                        </button>
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink :to="item.link">
                        <div class="text-xs lg:text-sm text-[#167000] hover:text-[#104f00] font-bold line-clamp-2">{{ item.title }}</div>
                    </NuxtLink>
                    <div class="text-xs line-clamp-2 mt-5">{{ item.desc }}</div>         
                </div>
            </div>
            <div class="flex justify-between items-end mt-3 px-6">
                <div class="text-base lg:text-xl" :class="[item.disc ? 'text-red-500': '']">${{ item.disc ? item.Discprice : item.price }}.00</div>                
                <div v-if="item.disc && item.Discprice" class="text-xs lg:text-base line-through">${{ item.price }}.00</div>
            </div>
        </div>   
    </div>
    <ModalPopupQuickView />
</template>

<script setup lang="ts">
    //border product
    const columns = ref(2); // Giá trị mặc định
    const updateColumns = () => {
        if (window.innerWidth >= 768) {
            columns.value = 4; // 4 cột cho màn hình lớn
        } else {
            columns.value = 2; // 2 cột cho màn hình nhỏ
        }
    };

    onMounted(() => {
        updateColumns(); // Cập nhật số cột khi component được mount
        window.addEventListener('resize', updateColumns); // Lắng nghe sự kiện thay đổi kích thước màn hình
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateColumns); // Gỡ bỏ sự kiện khi component bị hủy
    });

    const products = [
        {
            cate : 'Hair Color',
            image: '/images/products/vinashoptv-product.jpg',
            title: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g',           
            desc : 'Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy.',           
            price : '139',           
            link : '/', 
            disc : true,
            Discprice : '99',
        }
    ]
</script>

<style lang="css" scoped>
    .pop-up {
        display: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #ffffffdb;
    }

    @media (min-width: 1024px) {
        .group:hover .pop-up {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }

</style>