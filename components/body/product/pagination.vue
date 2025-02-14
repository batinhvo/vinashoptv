<template>
    <div class="flex flex-wrap text-center py-4 mt-8 border-t border-gray-100">
        <div class="w-full lg:w-1/2 lg:text-left">
            <p>Showing 1-2 of 2 results</p>
        </div>
        <div class="w-full lg:w-1/2 mt-4 lg:mt-0 lg:text-right">
            <button class="btn text-white bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] duration-300 mr-2">Previous</button>
            <input type="number" class="w-14 h-8 text-center border border-gray-200 rounded-md" value="1">
            <input type="text" class="w-4 h-8 text-center rounded-md mx-1" value="/">
            <input type="text" class="w-12 h-8 text-center border border-gray-200 rounded-md" value="1" disabled>
            <button class="btn text-white bg-primary py-1.5 px-4 rounded-md hover:shadow-[0_4px_11px_0_rgba(254,215,0,0.35)] duration-300 ml-2">Next</button>
        </div>                       
    </div>
</template>