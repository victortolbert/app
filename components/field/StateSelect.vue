<template>
    <div class="select w-full">
        <select
            v-model="state"
            :required="required"
            class="w-full"
        >
            <option
                :selected="currentState === null"
                disabled>{{ option }}</option>
            <option
                v-for="(stateObject, index) in $store.state.states"
                :key="index"
                :value="stateObject.state_code"
                :selected="stateObject.state_code === currentState"
            >{{ stateObject.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'StateSelect',
    status: 'prototype',
    release: '1.0.0',
    props: {
        option: {
            type: String,
            default: 'State'
        },
        currentState: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            state: null
        };
    },
    mounted () {
        if (this.currentState) {
            this.state = this.currentState;
        }
    }
};
</script>
