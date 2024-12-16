<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <HeaderTopbar />

        <!-- main-header-desktop -->
        <div class="container hidden xl:block">
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
        <div class="xl:hidden h-12 bg-gray-80 py-2 px-3 bg-neutral-100">
            <div class="container flex justify-between">
                <div class="flex">
                <HeaderMenuButtonMenu />
                <div class="max-w-[250px]">
                    <Logo />
                </div>
            </div>
            <div class="flex">
                <HeaderSearchIcon />
                <HeaderIconUserIcon />
                <HeaderIconCartIcon />
            </div> 
            </div>
        </div>      
    </header>
</template>