// Example admin UI override
export const Modal = {
    name: 'AdminModal',
    template: `
        <div class="admin-modal" v-if="isOpen">
            <div class="admin-modal-content">
                <h2>Admin Panel</h2>
                <slot></slot>
                <div class="admin-actions">
                    <button @click="save">Save</button>
                    <button @click="close">Close</button>
                </div>
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
        },
        save() {
            this.$emit('save');
            this.close();
        }
    }
};
