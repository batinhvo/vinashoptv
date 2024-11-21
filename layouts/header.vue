<template>
    <header class="bg-white shadow-sm">
        <!-- top-header -->
        <Topbar />
        <!-- main-header -->
        <div class="container mx-auto hidden xl:block">
            <div class="flex items-center py-2 xl:py-8">
                <Logo />
                <Searchbar />
                <CartIcon />
            </div>
            <!-- menu -->
            <div class="flex items-center">
                <MenuDropdown />
                <Menubar />
            </div>
        </div>      

        <!-- main-header-phone -->
        <div class="block xl:hidden bg-[#f2f2f2]">
            <div class="container mp-1 px-4">
                <div class="flex items-center max-h-[50px]">
                    <ButtonMenu />
                    <Logo />
                    <SearchIcon />
                    <UserIcon />
                    <div class="pt-3">
                        <CartIcon />
                    </div>
                    
                </div>
            </div>
        </div>
    </header>
</template>