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
            outline-none
            focus:outline-none
          "
        >
          <slot name="content" />
          <!--footer-->
          <div
            class="
              flex
              items-center
              justify-end
              p-6
              border-t border-solid border-gray-200
              rounded-b
            "
          >
            <button
              class="
                text-purple-500
                background-transparent
                font-bold
                uppercase
                px-6
                py-2
                text-sm
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "

              @click="$emit('close', false); toggleModal()"
            >
              Close
            </button>
            <button
              class="
                bg-purple-500
                text-white
                active:bg-purple-600
                font-bold
                uppercase
                text-xs
                px-4
                py-2
                rounded
                shadow
                hover:shadow-md
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "

              @click="$emit('close', true); toggleModal()"
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
      document.getElementById(this.modalID + '-backdrop').classList.toggle('hidden')
      document.getElementById(this.modalID).classList.toggle('flex')
      document.getElementById(this.modalID + '-backdrop').classList.toggle('flex')
    },
  },
}
</script>
