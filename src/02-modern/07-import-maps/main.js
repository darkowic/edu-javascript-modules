// Main module demonstrating import map usage

// Bare module specifiers
import { createApp } from 'vue';
import { map } from 'lodash';

// Path remapping
import { formatDate } from '#utils/date.js';
import { Button } from '#components/button.js';

// Version management
import { feature } from 'lib';
import { test } from 'lib/testing';

// Scoped packages
import { Modal } from '@company/ui';
import { validate } from '@company/utils';

// URL shortcuts
import { data } from 'cdn:data.js';
import { config } from 'local:config.js';

// Create Vue app
const app = createApp({
    components: {
        Button,
        Modal
    },
    data() {
        return {
            items: data,
            formattedDate: formatDate(new Date())
        };
    },
    methods: {
        processItems() {
            return map(this.items, item => {
                if (validate(item)) {
                    return feature(item);
                }
                return test(item);
            });
        }
    }
});

app.mount('#app');
