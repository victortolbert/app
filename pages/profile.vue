<template>
  <main>
    <div>
      <div
        class="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        class="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      />
      <div class="relative flex flex-col min-h-screen">
        <!-- 3 column wrapper -->
        <div class="flex-grow w-full mx-auto xl:px-8 lg:flex">
          <!-- Left sidebar & main wrapper -->
          <div class="flex-1 min-w-0 bg-white xl:flex">
            <div
              class="bg-white border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200"
            >
              <div class="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <!-- Start left column area -->
                <div class="relative h-full" style="min-height: 12rem">
                  <div
                    class="absolute inset-0 border-4 border-gray-200 border-dashed rounded-lg"
                  />
                </div>
                <!-- End left column area -->
              </div>
            </div>

            <div class="bg-white lg:min-w-0 lg:flex-1">
              <div class="h-full px-4 py-6 sm:px-6 lg:px-8">
                <!-- Start main area-->

                <FileUploadForm />

                <!-- End main area -->
              </div>
            </div>
          </div>

          <div
            class="pr-4 bg-gray-50 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0"
          >
            <div class="h-full py-6 pl-6 lg:w-80">
              <!-- Start right column area -->
              <div class="relative h-full" style="min-height: 16rem">
                <div
                  class="absolute inset-0 border-4 border-gray-200 border-dashed rounded-lg"
                />
              </div>
              <!-- End right column area -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
