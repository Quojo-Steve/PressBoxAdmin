<template>
    <!-- Modal -->
    <div class="modal fade show" id="exampleModal" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Industry</h1>
                    <button type="button" class="btn-close" @click="onHide"></button>
                </div>
                <form @submit.prevent="onSave">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="row" v-for="(item, i) in industries" :key="i">
                                <div class="col-md-10">
                                    <input type="text" class="form-control mb-3" placeholder="Name of industry"
                                        v-model="item.name" required>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn" :class="i === 0 ? 'btn-seconday' : 'btn-danger'" :disabled="i === 0"
                                        @click="onRemove(i)" type="button">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" type="button" @click="onNew">Add New</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="onHide">Close</button>
                        <button type="submit" class="btn btn-success">Save Industry</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Axios } from '../services/Axios';

const emit = defineEmits(['hide', 'save']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
});

const industries = ref([
    {
        name: null,
    }
]);

const isProcessing = ref(false);

const onHide = () => {
    emit('hide');
};

const onNew = () => {
    industries.value.push({
        name: null,
    });
};

const onRemove = (i) => {
    industries.value.splice(i, 1);
};

const onSave = async () => {
    const endpoint = '/superadmin/industries';
    const payload = {
        industries: industries.value
    };
    try {
        const { data } = await Axios.post(endpoint, payload);
        emit('save', data);
    } catch (error) {
        console.log(error);
    }
};

</script>