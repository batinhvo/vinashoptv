<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <HeaderTopbar />
        <!-- main-header -->
        <div class="container mx-auto hidden xl:block">
            <div class="flex items-center py-2 xl:py-8">
                <Logo />
                <HeaderSearchSearchbar />
                <HeaderIconCartIcon />
            </div>
            <!-- menu -->
            <div class="flex items-center">
                <HeaderMenuDropdown />
                <HeaderMenuMenubar />
            </div>
        </div>      
    </header>
</template>