<script>
  import Logo from '$lib/components/Logo.svelte';
  import { t } from '$lib/translations';
  const currentYear = new Date().getFullYear();
</script>

<footer>
  <!-- wrapper -->
  <div class="content-wrapper">
    <Logo />

    <ul>
      <li>
        <a href="documentation">
          {$t('layout.footer.documentation')}
        </a>
      </li>
      <li>
        <a href="help">
          {$t('layout.footer.help')}
        </a>
      </li>
    </ul>
  </div>

  <!-- copyright -->
  <span class="copyright-text">
    © {currentYear}

    <a href="https://github.com/Ekisa-Team/chatbots-web-client" class="hover:underline"> Kibot </a>

    . All rights reserved.
  </span>
</footer>

<style lang="postcss">
  footer {
    grid-area: footer;
    @apply container mx-auto;
    @apply flex-shrink-0;
    @apply px-4 py-8;
  }

  .content-wrapper {
    @apply bg-footer;
    @apply flex items-center justify-between;
    @apply p-4;
    @apply rounded-lg;
    @apply shadow;
  }

  ul {
    @apply flex flex-wrap items-center;
    @apply text-sm text-primary;
  }

  ul > li > a {
    @apply mr-4 md:mr-6;
  }

  ul > li > a:hover {
    @apply underline;
  }

  .copyright-text {
    @apply block;
    @apply pt-8;
    @apply text-sm text-gray-500;
    @apply text-center;
  }
</style>
