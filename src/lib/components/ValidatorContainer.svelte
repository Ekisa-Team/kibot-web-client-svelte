<script lang="ts">
  import type { Field } from 'svelte-forms/types';

  export let field: Field<string> | Field<number> | Field<boolean> | Field<Date> | Field<undefined>;

  const messages = new Map([
    ['required', 'El campo es requerido.'],
    ['pattern', 'El valor actual no coincide con la expresión regular.'],
    ['between', 'El valor ingresado no está dentro del rango.'],
    ['email', 'El correo electrónico es inválido.'],
    ['url', 'El valor ingresado NO es una URL válida.'],
    ['min', 'La longitud del valor ingresado es inferior al mínimo permitido.'],
    ['max', 'La longitud del valor ingresado es mayor al máximo permitido.']
  ]);
</script>

{#if field}
  <div>
    {#each field.errors as error}
      <p class="text-sm text-red-500 dark:text-red-400">{messages.get(error)}</p>
    {/each}
  </div>
{/if}
