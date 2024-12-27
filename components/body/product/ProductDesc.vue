<template>
    <div class="bg-gray-13 min-h-36 my-10">
        <div class="container px-4 py-10">
            <!-- control -->
            <div class="text-center">
                <button class="p-2 mx-2 text-font-18" 
                :class="{'active font-bold border-b-2 border-primary' : activeTab === 'about'}"
                @click="activeTab = 'about'">
                    About This Product
                </button>

                <button class="p-2 mx-2 text-font-18"
                :class="{'active font-bold border-b-2 border-primary' : activeTab === 'how'}"
                @click="activeTab = 'how'">
                    How To Use
                </button>
            </div>

            <!-- content -->
            <div class="border border-gray-200 rounded-xl p-4 xl:p-12 ">
                <div v-if="activeTab === 'about'">
                    <h2>About This Product</h2>
                    <p>
                    Enriched with keratin, ceramide, natural ingredients (Green Tea Extract, Jojoba, Olive Oil, Aloe Vera Gel, Acorus Calamus Root Extract) and with no ammonia, it nourishes hair fibers deep within and keeps hair healthy.
                    </p>
                    <p>
                    The unique formula makes hair coloring simple and fast. You can easily color your hair by yourself. It takes just 1 minute from application to development. After 1 minute, shampoo and rinse your hair.
                    </p>
                </div>
                <div v-if="activeTab === 'how'">
                    <h2>How To Use</h2>
                    <p>
                    1. Apply the cream evenly to dry hair.<br />
                    2. Leave it on for 1 minute.<br />
                    3. Rinse thoroughly with water and shampoo.<br />
                    4. Enjoy your new hair color!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const activeTab = ref('about');
</script>
