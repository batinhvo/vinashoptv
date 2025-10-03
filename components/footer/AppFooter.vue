<template>
    <div class="bg-gray-13 pt-14 pb-4 border-t border-primary px-4 lg:px-0">
        <div class="container mx-auto">
            <div class="flex flex-wrap">
                <div class="w-full lg:w-1/3">
                    <div class="mb-10">
                        <a href="/" class="logo">
                            <img src="/assets/images/logo-01.png" alt="Vinashop Logo" class="w-[200px] h-auto">
                        </a>
                    </div>
                    <div class="mb-1">
                        <div class="mb-4 flex items-center">
                            <div class="w-20 text-6xl">
                                <i class="ec ec-support text-primary"></i>
                            </div>
                            <div class="w-80">
                                <div class="text-font-13">Customer Service 24/7!</div>
                                <a class="text-xl font-normal hover:text-black" href="tel:+1(855) 855-5888">(855) 855-5888</a>
                            </div>
                        </div>
                        <div class="mb-4 flex items-center">
                            <div class="w-20 text-6xl">
                                <i class="ec ec-support text-primary"></i>
                            </div>
                            <div class="w-80">
                                <div class="text-font-13">Live show (Mon - Wed - Fri: 3:00pm - 4:00pm CST)</div>
                                <a class="text-xl font-normal hover:text-black" href="tel:+1(855) 558-8000">(855) 558-8000</a>
                            </div>
                        </div>
                        <div class="mb-4 flex items-center">
                            <div class="w-20 text-6xl">
                                <i class="ec ec-support text-primary"></i>
                            </div>
                            <div class="w-80">
                                <div class="text-font-13">Radio show: (Tue 5:30pm - 6:00pm CST)</div>
                                <a class="text-xl font-normal hover:text-black" href="tel:+1(713) 931-1560">(713) 931-1560</a>
                            </div>
                        </div>
                    </div>        
                    <div>
                        <h6 class="mb-1 font-bold text-base">E-Mail</h6>
                        <div class="mb-4 flex items-center">
                            <div class="text-2xl">
                                <i class="ec ec-newsletter text-primary"></i>                               
                                <a class="text-font-15 hover:text-black" href="mailto:info@vinashoptv.com">info@vinashoptv.com</a>
                            </div>
                        </div>
                        <div class="my-6">
                            <ul class="flex icon-social">
                                <li class="size-12 relative flex items-center justify-center">
                                    <a href="https://www.facebook.com/VinashopUSA" class="text-xl">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                </li>                                
                                <li class="size-12 relative flex items-center justify-center">
                                    <a href="https://maps.app.goo.gl/BQcMfCWmGyVaBoyD8" class="text-xl">
                                        <i class="fab fa-google"></i>
                                    </a>
                                </li>
                                <li class="size-12 relative flex items-center justify-center">
                                    <a href="https://www.youtube.com/@vinashoptv8479" class="text-xl">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>           
                </div>

                <div class="w-full lg:w-1/3">      
                    <h6 class="mb-6 font-bold text-base underline">Address</h6>            
                    <div class="mb-1">
                        <div class="mb-4">
                            <h6 class="font-bold text-base">Houston:</h6>
                            <div class="flex flex-col">
                                <div class="text-2xl">
                                    <i class="ec ec-map-pointer text-primary"></i>
                                    <span class="text-sm">11322 Bellaire Blvd, Suite 111, Houston, TX - 77072</span>
                                </div>
                                <div class="text-2xl">
                                    <i class="ec ec-phone text-primary"></i>
                                    <a class="text-sm" href="tel:+1(281) 619-5000">(281) 619-5000</a>
                                </div>
                            </div>                            
                        </div>      
                        <div class="mb-4">
                            <h6 class="font-bold text-base">Dallas:</h6>
                            <div class="flex flex-col">
                                <div class="text-2xl">
                                    <i class="ec ec-map-pointer text-primary"></i>
                                    <span class="text-sm">3112 N Jupiter Rd #317, Garland, Texas 75044</span>
                                </div>
                                <div class="text-2xl">
                                    <i class="ec ec-phone text-primary"></i>
                                    <a class="text-sm" href="tel:+1(214) 300-2000">(214) 300-2000</a>
                                </div>
                            </div>                            
                        </div>     
                        <div class="mb-4">
                            <h6 class="font-bold text-base">Business Hours</h6>
                            <div class="flex flex-col">
                                <address>
                                    <span class="text-2xl"><i class="ec ec-arrow-right-categproes text-primary pt-1"></i></span>
                                    <span class="not-italic">[Houston] Mon - Sun: 09:30 AM - 06:00 PM</span>
                                </address>
                                <address>
                                    <span class="text-2xl"><i class="ec ec-arrow-right-categproes text-primary pt-1"></i></span>
                                    <span class="not-italic">[Dallas] Mon - Sun: 10:00 AM - 06:00 PM</span>
                                </address>
                            </div>                            
                        </div>     
                    </div>                             
                </div>

                <div class="w-full lg:w-1/3">      
                    <h6 class="mb-4 font-bold text-base underline">Important</h6>            
                    <div class="my-4">
                        <ul class="flex flex-col">
                            <li class="my-1.5"><NuxtLink to="/article/privacy" class="hover:text-black">Privacy</NuxtLink></li>                                
                            <li class="my-1.5"><NuxtLink to="/article/billing-orders" class="hover:text-black">Billing & Orders</NuxtLink></li>       
                            <li class="my-1.5"><NuxtLink to="/article/return-policy" class="hover:text-black">Return Policy</NuxtLink></li>       
                            <li class="my-1.5"><NuxtLink to="/article/term-condition" class="hover:text-black">Term & Condition</NuxtLink></li>       
                            <li class="my-1.5"><NuxtLink to="/contact" class="hover:text-black">Contacts</NuxtLink></li>       
                        </ul>
                    </div>                           
                </div>
                
            </div>
        </div>
    </div>
    <div class="py-2 bg-gray-14">
        <div class="flex mx-auto">
            <div class="container px-4 md:px-0">
                <span>@ </span>
                <NuxtLink to="/" class="font-bold">Vinashop</NuxtLink>
                <span> - All rights Reserved</span>
            </div>
        </div>
    </div>
    <BtnBackToTop />
</template>

<style scoped>
    .icon-social li:hover {
        background-color: #333e48ba;
        border-radius: 50%;
    }

    .icon-social li:hover a {
        color: #ffffff;
    }
</style>
