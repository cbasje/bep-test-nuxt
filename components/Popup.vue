<template>
  <div class="absolute">
    <div
      class="
        flex
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
      "
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
          class="
            border-0
            rounded-lg
            shadow-lg
            relative
            flex flex-col
            w-full
            bg-white
            dark:bg-gray-900
            outline-none
            focus:outline-none
          "
        >
          <!--header-->
          <div
            class="
              flex
              items-start
              justify-between
              p-5
              border-b border-solid border-gray-200
              dark:border-gray-700
              rounded-t
            "
          >
            <h3 class="text-3xl font-semibold dark:text-white">
              <slot name="title" />
            </h3>
          </div>
          <!--body-->
          <slot name="content" />
        </div>
      </div>
    </div>
    <div class="opacity-50 fixed inset-0 z-40 bg-black" />
  </div>
</template>
