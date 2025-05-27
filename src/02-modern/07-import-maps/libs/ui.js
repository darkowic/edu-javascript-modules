// Example UI library module
export const Modal = {
    name: 'Modal',
    template: `
        <div class="modal" v-if="isOpen">
            <div class="modal-content">
                <slot></slot>
                <button @click="close">Close</button>
            </div>
        </div>
    `,
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        }
    }
};
