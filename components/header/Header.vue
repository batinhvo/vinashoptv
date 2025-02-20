<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <HeaderTopBar />

        <!-- main-header-desktop -->
        <div class="container hidden xl:block">
            <div class="flex items-center py-2 xl:py-8">
                <vinaLogo />
                <HeaderSearchBar />
                <HeaderIconCartIcon />
            </div>
            <!-- menu -->
            <div class="flex items-center">
                <MenuCategoryHeader />
                <HeaderMenuBar />
            </div>
        </div>      

        <!-- main-header-mobile -->
        <div class="xl:hidden h-12 bg-gray-80 py-2 px-3 bg-neutral-100">
            <div class="container flex justify-between">
                <div class="flex">
                <MenuCategoryPhone />               
                <div class="max-w-[250px]">
                    <VinaLogo />
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
