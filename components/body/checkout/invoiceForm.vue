<template>
    <div class="pb-5">
        <table class="w-full">
            <thead>
                <tr>
                    <th class="text-left max-w-80 pb-4">Product </th>
                    <th class="text-right pl-8 pb-4"> Total</th>
                </tr>
            </thead>
            <tbody class="border-t border-gray-300">                
                <tr v-for="(product, index) in products" :key="product.id">
                    <td class="py-4 border-t border-gray-300">
                        <p class="mb-1">{{ product.name }}</p>
                        <!-- Quantity -->                       
                        <div class="flex border border-zinc-300 rounded-full bg-white pl-5 pr-3 py-1">                           
                            <input v-model="product.quantity" class="w-full focus:outline-none" type="number">
                            <button   @click.prevent="decrement(index)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">
                                <span class="text-xs">
                                    <i class="fa fa-minus pb-1 text-gray-500" aria-hidden="true"></i>
                                </span>
                            </button>
                            <button @click.prevent="increment(index)" class="w-9 h-7 text-center hover:bg-gray-300 border border-white rounded-full">                                    
                                <span class="text-xs">
                                    <i class="fa fa-plus pb-1 text-gray-500" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>             
                        <div class="flex items-center mt-3">
                            <p class="font-bold">Gift:</p>
                            <p class="border border-green-300 bg-green-100 rounded-lg py-0.5 px-3 ml-5">Assanta Hair Color # 5</p>
                            <button class="w-7 h-7 text-center hover:bg-gray-300 rounded-full ml-5">
                                <span class="text-xs">
                                    <i class="fa fa-times pb-1 text-gray-500" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>                          
                    </td>
                    <td class="pl-4 xl:pl-8 py-4 content-baseline text-right">
                        ${{ product.price }}.00
                        <button class="w-7 h-7 text-center hover:bg-gray-300 hover:border rounded-full">
                            <span class="text-xs">
                                <i class="fa fa-times pb-1 text-gray-500" aria-hidden="true"></i>
                            </span>
                        </button>
                    </td>
                </tr>               
            </tbody>
            <tfoot class="border-t border-gray-300 ">
                <tr>
                    <th class="py-4">If you have a coupon code, please apply it below.</th>                    
                </tr>
                <tr>                   
                    <td>
                        <div class="flex pb-5">                           
                            <input class="w-full focus:outline-none p-2.5 pl-5 focus:border-blue-300 border border border-zinc-300 rounded-l-full bg-white" type="text" placeholder="Coupon Code">
                            <button class="pl-4 text-center text-white bg-gray-600 hover:shadow-xl">
                                Apply
                            </button>
                            <button class="px-4 text-center text-white bg-gray-600  hover:shadow-xl rounded-r-full">
                                Cancel
                            </button>
                        </div>      
                    </td>         
                </tr>
                <tr class="border-t border-gray-300">
                    <th class="text-left py-3">Subtotal</th>
                    <td class="text-right py-3">$100.00</td>
                </tr>
                <tr class="border-t border-gray-300">
                    <th class="text-left py-3">Shipping & Handling</th>
                    <td class="text-right py-3">$9.00</td>
                </tr>
                <tr class="border-t border-gray-300">
                    <th class="text-left py-3">Discount</th>
                    <td class="text-right py-3">-$9.00</td>
                </tr>
                <tr class="border-t border-gray-300">
                    <th class="text-left py-3">Tax</th>
                    <td class="text-right py-3">$0.00</td>
                </tr>
                <tr class="border-t border-gray-300">
                    <th class="text-left py-3">Total</th>
                    <th class="text-right py-3">$999.00</th>
                </tr>              
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
    const products = ref([
        { id: '01', name: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g - default', price: 139, quantity: 1 },
        { id: '02', name: 'Assanta Hair Color # 4 Minute 60g (Light Chestnut) 2 tubes x 60g - default', price: 99, quantity: 1 }
    ]);
    // quantity
    const increment = (index: number) => {
        products.value[index].quantity++;
    };
    const decrement = (index: number) => {
        if (products.value[index].quantity > 1) {  
            products.value[index].quantity--;
        }
    };
</script>

<style lang="css" scoped>
    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield; /* Ẩn trên Firefox */
        appearance: none;
    }
</style>