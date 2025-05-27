// Example component module
export const Button = {
    name: 'Button',
    template: `
        <button class="btn" @click="onClick">
            <slot></slot>
        </button>
    `,
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
