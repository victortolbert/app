export const names = [
  'UX Lab',
]

export default defineAppConfig({
  hey: false,
  name: 'Prototypes',
  description: 'An opinionated UI prototyping toolkit and laboratory for UX designers.',
  ui: {
    primary: 'brand',
    gray: 'slate',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0',
    },
    container: {
      base: 'mx-auto',
      padding: 'px-2 sm:px-4 lg:px-8',
      constrained: 'max-w-7xl',
    },
    accordion: {
      wrapper: 'w-full flex flex-col',
      item: {
        base: '',
        size: 'text-sm',
        color: 'text-gray-500 dark:text-gray-400',
        padding: 'pt-1.5 pb-3',
        icon: 'ms-auto transform transition-transform duration-200',
      },
      transition: {
        enterActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
        leaveActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
      },
      default: {
        openIcon: 'i-heroicons-chevron-down-20-solid',
        closeIcon: '',
        class: 'mb-1.5 w-full',
        variant: 'soft',
      },
    },
    dropdown: {
      wrapper: 'relative inline-flex text-left rtl:text-right',
      container: 'z-20',
      width: 'w-48',
      height: '',
      background: 'bg-white dark:bg-gray-800',
      shadow: 'shadow-lg',
      rounded: 'rounded-md',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
      base: 'relative focus:outline-none overflow-y-auto scroll-py-1',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      padding: 'p-1',
      item: {
        base: 'group flex items-center gap-2 w-full',
        rounded: 'rounded-md',
        padding: 'px-2 py-1.5',
        size: 'text-sm',
        active: 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white',
        inactive: 'text-gray-700 dark:text-gray-200',
        disabled: 'cursor-not-allowed opacity-50',
        icon: {
          base: 'flex-shrink-0 h-4 w-4',
          active: 'text-gray-500 dark:text-gray-400',
          inactive: 'text-gray-400 dark:text-gray-500',
        },
        avatar: {
          base: 'flex-shrink-0',
          size: '3xs',
        },
        shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5 ms-auto',
      },
      transition: {
        enterActiveClass: 'transition duration-100 ease-out',
        enterFromClass: 'transform scale-95 opacity-0',
        enterToClass: 'transform scale-100 opacity-100',
        leaveActiveClass: 'transition duration-75 ease-out',
        leaveFromClass: 'transform scale-100 opacity-100',
        leaveToClass: 'transform scale-95 opacity-0',
      },
      popper: {
        placement: 'bottom-end',
        strategy: 'fixed',
      },
    },
    table: {
      wrapper: 'relative',
      base: 'min-w-full table-fixed',
      divide: 'divide-y divide-gray-300 dark:divide-gray-700',
      thead: '',
      tbody: 'divide-y divide-gray-200 dark:divide-gray-800',
      tr: {
        base: '',
        selected: 'bg-gray-50 dark:bg-gray-800/50',
      },
      th: {
        base: 'text-left rtl:text-right',
        padding: 'px-3 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-sm',
      },
      td: {
        base: 'whitespace-nowrap',
        padding: 'px-3 py-4',
        color: 'text-gray-500 dark:text-gray-400',
        font: '',
        size: 'text-sm',
      },
      loadingState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 dark:text-white',
        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin',
      },
      emptyState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 dark:text-white',
        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4',
      },
      default: {
        sortAscIcon: 'i-carbon-chevron-sort-up',
        sortDescIcon: 'i-carbon-chevron-sort-down',
        sortButton: {
          icon: 'i-carbon-chevron-sort',
          trailing: true,
          square: true,
          color: 'gray',
          variant: 'ghost',
          class: '-m-1.5',
        },
        loadingState: {
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        },
        emptyState: {
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No items.',
        },
      },
    },
  },
})
