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
            <div class="border border-green-200 rounded-2xl p-4 xl:p-12 bg-[#def5dd] shadow-xl">
                <div v-if="activeTab === 'about'">
                    <div v-html="contentPro"></div>
                </div>
                <div v-if="activeTab === 'how'">
                    <div v-html="howToUsePro"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const activeTab = ref('about');

    defineProps<{
        contentPro?: string,
        howToUsePro?: string,
    }>();
</script>
