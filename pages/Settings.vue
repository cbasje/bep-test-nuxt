<template>
  <section>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="sm:overflow-hidden">
        <div class="px-4 py-5 space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="title"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Color mode
              </label>
              <select
                v-model="$colorMode.preference"
                class="
                  mt-1
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  shadow-sm
                  sm:text-sm
                  bg-transparent
                  dark:text-white
                  border-gray-300
                  dark:border-gray-600
                  rounded-md
                "
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div>
            <p class="dark:text-white">
              Map data &copy;
              <a
                class="text-blue-700 dark:text-blue-500 underline"
                href="https://www.openstreetmap.org/copyright"
              >
                OpenStreetMap
              </a>
              contributors, Imagery ©
              <a
                class="text-blue-700 dark:text-blue-500 underline"
                href="https://www.mapbox.com/"
              >
                Mapbox
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--footer-->
    <div
      class="
        flex
        items-center
        justify-end
        p-5
        border-t border-solid border-gray-200
        dark:border-gray-700
        rounded-b
      "
    >
      <popup-button
        :is-filled="false"
        class="mr-2"
        @click="
          $emit('closePopup')
          $router.push({ path: '/' })
        "
      >
        Close
      </popup-button>
    </div>
  </section>
</template>
