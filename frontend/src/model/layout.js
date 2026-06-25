import { ref } from 'vue'

const isLeftSidebarCollapsed = ref(false)
const isRightSidebarOpen = ref(false)

export function useLayout() {
  return {
    isLeftSidebarCollapsed,
    isRightSidebarOpen,
    toggleLeftSidebar: () => {
      isLeftSidebarCollapsed.value = !isLeftSidebarCollapsed.value
    },
    toggleRightSidebar: () => {
      isRightSidebarOpen.value = !isRightSidebarOpen.value
    },
  }
}
