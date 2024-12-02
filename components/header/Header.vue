<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <HeaderTopbar />

        <!-- main-header-desktop -->
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

        <!-- main-header-mobile -->
        <div class="container mx-auto lg:hidden block h-12 bg-gray-80 py-2 px-3">
            <div class="flex">
                <HeaderMenuButtonMenu />
                <Logo />
                <HeaderSearchIcon />
                <HeaderIconUserIcon />
                <HeaderIconCartIcon />
            </div>
            
        </div>      
    </header>
</template>