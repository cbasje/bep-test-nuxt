<template>
  <div>
    <!-- Button trigger modal -->
    <modal-button :is-filled="true" @click="toggleModal()"
      >Open Popup</modal-button
    >
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
            <modal-button
              :is-filled="false"
              class="mr-2"
              @click="
                $emit('close', false)
                toggleModal()
              "
            >
              Close
            </modal-button>
            <modal-button
              :is-filled="true"
              @click="
                $emit('close', true)
                toggleModal()
              "
            >
              Save Changes
            </modal-button>
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

<script lang="ts">
import Vue from 'vue'
import ModalButton from '~/components/ModalButton.vue'

export default Vue.extend({
  components: { ModalButton },
  data() {
    return {
      modalID: 'modal-regular',
    }
  },
  methods: {
    toggleModal() {
      const modal = document.getElementById(this.modalID)
      const modalBackdrop = document.getElementById(this.modalID + '-backdrop')

      if (modal == null || modalBackdrop == null) return

      modal.classList.toggle('hidden')
      modalBackdrop.classList.toggle('hidden')
      modal.classList.toggle('flex')
      modalBackdrop.classList.toggle('flex')
    },
  },
})
</script>
