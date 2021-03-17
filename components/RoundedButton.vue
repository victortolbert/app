<template>
    <a
        class="max-w-xs text-24 button shadow is-medium is-rounded is-fullwidth font-semibold mx-auto"
        @click="clicked">
        {{ text }}
    </a>
</template>

<script>
export default {
    name: 'RoundedButton',
    status: 'prototype',
    release: '1.0.0',
    props: {
        text: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: ''
        },
        gaData: {
            type: Object,
            default: null
        }
    },
    methods: {
        clicked () {
            this.gaTrack();
            this.$emit('clicked');
            this.navigateToLink();
        },
        gaTrack () {
            if (!this.gaData) return;
            this.gaEvent(
                this.gaData.category,
                this.gaData.label,
                this.gaData.action
            );
        },
        navigateToLink () {
            if (this.link) {
                window.location.href = this.link;
            }
        }
    }
};
</script>
