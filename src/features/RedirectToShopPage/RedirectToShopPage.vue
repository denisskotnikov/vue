<script setup lang="ts">
defineProps<{
    className?: string;
}>();
</script>

<template>
    <Button v-slot="slotProps" outlined as-child plain size="large">
        <!-- @vue-ignore -->
        <RouterLink
            :class="`${className} ${slotProps.class}`"
            class="text-white hover:text-black flex justify-center max-w-[173px]"
            to="/products"
        >
            Shop Now
        </RouterLink></Button
    >
</template>
