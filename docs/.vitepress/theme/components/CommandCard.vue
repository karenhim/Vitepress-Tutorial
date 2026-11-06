<script setup lang="ts">
import { ref } from 'vue'

// Props: data passed in from the parent (the Markdown page)
const props = defineProps<{
  command: string
  label?: string
}>()

// Local state: each card instance has its own "copied" value
const copied = ref(false)

// Event handler: runs when the button is clicked
async function copy() {
  await navigator.clipboard.writeText(props.command)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="command-card">
    <div class="header">
      <span v-if="label" class="label">{{ label }}</span>
      <code class="command">{{ command }}</code>
      <button class="copy" @click="copy">{{ copied ? 'Copied!' : 'Copy' }}</button>
    </div>
    <!-- Slot: content placed between <CommandCard> tags appears here -->
    <div class="body"><slot /></div>
  </div>
</template>

<style scoped>
.command-card {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.label {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.command {
  flex: 1;
  font-size: 14px;
}

.copy {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: background-color 0.2s;
}

.copy:hover {
  background-color: var(--vp-c-brand-soft);
}

.body {
  margin-top: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.body :deep(p) {
  margin: 0;
}
</style>
