<template>
  <aside
    class="sticky top-0 z-40 hidden h-dvh flex-col py-5 glass-sidebar lg:flex transition-[width] duration-300 border-l border-white/5"
    :class="layout.isRightSidebarOpen.value ? 'w-[280px] px-4' : 'w-0 overflow-hidden px-0'"
  >
    <div class="flex items-center justify-between pb-6 pt-2" v-show="layout.isRightSidebarOpen.value">
      <h2 class="text-sm font-bold tracking-tight text-base-content">Now Playing</h2>
      <button class="icon-btn icon-btn-sm" @click="layout.toggleRightSidebar()" title="Close Now Playing">
        <Icon icon="clarity:close-line" class="h-4 w-4" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto hidden-scrollbar flex flex-col items-center text-center mt-4" v-if="layout.isRightSidebarOpen.value && currentTrack">
      <div class="w-full aspect-square rounded-2xl overflow-hidden bg-base-200 shadow-md border border-white/10 mb-6">
        <img
          v-if="!coverFailed"
          :src="currentTrack.cover"
          :alt="currentTrack.title"
          class="h-full w-full object-cover"
          @error="coverFailed = true"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FA233B]/25 to-[#ff8f9f]/10 text-[#FA233B]"
        >
          <Icon icon="clarity:music-note-line" class="h-16 w-16" />
        </div>
      </div>

      <div class="w-full px-2">
        <h3 class="text-xl font-bold tracking-tight text-base-content line-clamp-2 leading-tight mb-2">
          {{ currentTrack.title }}
        </h3>
        <p class="text-sm font-medium text-base-content/60 line-clamp-1">
          {{ currentTrack.artist }}
        </p>
      </div>
      
      <div class="mt-8 w-full p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 backdrop-blur-md">
        <p class="text-xs font-semibold text-base-content/50 uppercase tracking-widest text-left mb-3">Up Next</p>
        <div class="flex items-center gap-3 text-left">
          <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-base-300">
            <img v-if="nextTrack" :src="nextTrack.cover" class="w-full h-full object-cover" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium truncate text-base-content">{{ nextTrack?.title || 'End of queue' }}</p>
            <p class="text-xs text-base-content/50 truncate">{{ nextTrack?.artist || '-' }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="layout.isRightSidebarOpen.value" class="flex-1 flex flex-col items-center justify-center text-center opacity-50">
      <Icon icon="clarity:music-note-line" class="h-12 w-12 mb-4" />
      <p class="text-sm font-medium">Nothing is playing</p>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useLayout } from '../model/layout'
import { usePlayer } from '../model/player'

const layout = useLayout()
const player = usePlayer()
const coverFailed = ref(false)

const currentTrack = computed(() => player.currentTrack.value)

const nextTrack = computed(() => {
  if (player.playlist.value.length === 0) return null
  let i = player.currentIndex.value + 1
  if (player.shuffle.value) {
    // simplified for UI preview, just show next item in normal order or nothing
    return player.playlist.value[i] || null
  }
  if (i >= player.playlist.value.length) {
    if (player.repeatMode.value === 'all') {
      return player.playlist.value[0]
    }
    return null
  }
  return player.playlist.value[i]
})

watch(currentTrack, () => {
  coverFailed.value = false
})
</script>
