<template>
  <div>
    <!-- Button trigger modal -->
    <button
      class="
        bg-purple-500
        text-white
        active:bg-purple-600
        font-bold
        uppercase
        text-sm
        px-6
        py-3
        rounded
        mx-auto
        hover:shadow-lg
        outline-none
        focus:outline-none
        ease-linear
        transition-all
        duration-150
      "
      @click="toggleModal()"
    >
      Open Popup
    </button>
    <!-- Modal -->
    <div
      id="modal-regular"
      class="
        hidden
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
            <h3 class="text-3xl font-semibold dark:text-white">Modal Title</h3>
          </div>
          <slot name="content" />
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
            <button
              class="
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                hover:shadow-sm
                text-sm
                font-medium
                rounded-md
                text-indigo-700
                dark:text-indigo-500
                background-transparent
                hover:bg-gray-100
                dark:hover:bg-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                mr-2
              "
              @click="
                $emit('close', false)
                toggleModal()
              "
            >
              Close
            </button>
            <button
              class="
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
              @click="
                $emit('close', true)
                toggleModal()
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="modal-regular-backdrop"
      class="hidden opacity-50 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalID: 'modal-regular',
    }
  },
  methods: {
    toggleModal() {
      document.getElementById(this.modalID).classList.toggle('hidden')
      document
        .getElementById(this.modalID + '-backdrop')
        .classList.toggle('hidden')
      document.getElementById(this.modalID).classList.toggle('flex')
      document
        .getElementById(this.modalID + '-backdrop')
        .classList.toggle('flex')
    },
  },
}
</script>
