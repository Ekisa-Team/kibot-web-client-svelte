<script>
  import Logo from '$lib/components/Logo.svelte';
  import { t } from '$lib/translations';
  const currentYear = new Date().getFullYear();
</script>

<footer class="ui-footer w-full">
  <!-- wrapper -->
  <div class="bg-white dark:bg-zinc-800 flex items-center px-6 py-4 rounded-lg shadow justify-between">
    <Logo />

    <ul class="flex flex-wrap items-center space-x-3">
      <li>
        <a href="documentation" class="text-sm hover:underline">
          {$t('layout.footer.documentation')}
        </a>
      </li>
      <li>
        <a href="help" class="text-sm hover:underline">
          {$t('layout.footer.help')}
        </a>
      </li>
    </ul>
  </div>

  <!-- copyright -->
  <span class="block pt-6 text-sm text-gray-500 text-center">
    © {currentYear}

    <a href="https://github.com/Ekisa-Team/chatbots-web-client" class="hover:underline"> Kibot </a>

    . All rights reserved.
  </span>
</footer>

<style>
  footer {
    grid-area: footer;
  }
</style>
