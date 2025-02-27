<template>
    <div class="py-2">
        <div class="font-bold py-2">Billing Information</div>
        <div class="flex flex-wrap items-center md:py-2">                                       
            <div class="w-full md:w-1/4 py-1">{{ order.billingFirstName + ' ' + order.billingLastName }}</div>
            <div class="w-full md:w-2/4 py-1 border-x border-gray-200">{{ order.billingAddress }}</div>
            <div class="w-full md:w-1/4 py-1">{{ order.billingPhone }}</div>
        </div>
        <div class="font-bold py-2 border-t border-gray-200">Shipping Information</div>
        <div class="flex flex-wrap items-center md:py-2">                                       
            <div class="w-full md:w-1/4 py-1">{{ order.shipFirstName + ' ' + order.shipLastName }}</div>
            <div class="w-full md:w-2/4 py-1 border-x border-gray-200">{{ order.shipAddress }}</div>
            <div class="w-full md:w-1/4 py-1">{{ order.shipPhone }}</div>
        </div>
        <div class="py-3 border-t border-gray-200 font-bold">Order Note</div>
        <div class="flex flex-wrap items-center md:py-2" v-if="order.userNote">                                       
            <div class="w-full py-1">{{ order.userNote }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderHistory } from 'types/orderTypes';
    defineProps<{
        order: OrderHistory,
    }>();
</script>