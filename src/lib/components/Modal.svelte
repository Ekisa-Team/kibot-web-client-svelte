<script lang="ts">
  import {
    Dialog,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
    Transition,
    TransitionChild
  } from '@rgossiaux/svelte-headlessui';

  export let isOpen = false;
  export let size:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
    | null = null;
</script>

<Transition appear show={isOpen}>
  <!-- dialog -->
  <Dialog as="div" class="fixed inset-0 z-20" open={isOpen} on:close={() => (isOpen = false)}>
    <!-- overlay -->
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <DialogOverlay class="fixed inset-0 bg-black/30 backdrop-blur-md  dark:bg-black/80" />
    </TransitionChild>

    <!-- content -->
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      class="grid h-full place-items-center">
      <!-- container -->
      <div
        class="my-8 mx-1 inline-block transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all dark:bg-zinc-800"
        class:max-w-xs={size === 'xs'}
        class:max-w-sm={size === 'sm'}
        class:max-w-md={size === 'md'}
        class:max-w-lg={size === 'lg'}
        class:max-w-xl={size === 'xl'}
        class:max-w-2xl={size === '2xl'}
        class:max-w-3xl={size === '3xl'}
        class:max-w-4xl={size === '4xl'}
        class:max-w-5xl={size === '5xl'}
        class:max-w-6xl={size === '6xl'}
        class:max-w-7xl={size === '7xl'}
        class:max-w-full={size === 'full'}>
        <!-- title -->
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-400">
          <slot name="title" />
        </DialogTitle>

        <!-- description -->
        <DialogDescription>
          <slot name="description" />
        </DialogDescription>

        <!-- actual content -->
        <slot name="content" />
      </div>
    </TransitionChild>
  </Dialog>
</Transition>
