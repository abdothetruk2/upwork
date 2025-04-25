<template>
  <footer class="bg-neutral-800 text-neutral-200 py-12">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Column 1 -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="h-10 w-10 overflow-hidden rounded-lg bg-primary-500 flex items-center justify-center">
              <img src="https://images.pexels.com/photos/5726693/pexels-photo-5726693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="UpClone Logo" class="h-full w-full object-cover" />
            </div>
            <span class="text-2xl font-bold text-white">UpClone</span>
          </div>
          <p class="text-neutral-400 mb-4">
            The world's work marketplace that connects businesses with independent talent.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-neutral-400 hover:text-white transition">
              <Icon name="mdi:twitter" size="24" />
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition">
              <Icon name="mdi:facebook" size="24" />
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition">
              <Icon name="mdi:instagram" size="24" />
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition">
              <Icon name="mdi:linkedin" size="24" />
            </a>
          </div>
        </div>
        
        <!-- Column 2 -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">For Clients</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-neutral-400 hover:text-white transition">How to Hire</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Talent Marketplace</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Enterprise</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Payroll Services</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Direct Contracts</a></li>
          </ul>
        </div>
        
        <!-- Column 3 -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">For Talent</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-neutral-400 hover:text-white transition">How to Find Work</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Direct Contracts</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Finding Freelance Jobs</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Skills Tests</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Become an Agency</a></li>
          </ul>
        </div>
        
        <!-- Column 4 -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Help & Support</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Success Stories</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Blog</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Community</a></li>
            <li><a href="#" class="text-neutral-400 hover:text-white transition">Affiliate Program</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-neutral-400 text-sm">
          &copy; {{ new Date().getFullYear() }} UpClone Inc.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-neutral-400 hover:text-white text-sm transition">Terms of Service</a>
          <a href="#" class="text-neutral-400 hover:text-white text-sm transition">Privacy Policy</a>
          <a href="#" class="text-neutral-400 hover:text-white text-sm transition">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
</template>