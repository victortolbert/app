<template>
  <div class="min-h-screen p-8 bg-grey-darker">
    <div class="max-w-sm mx-auto">
      <AccordionList>
        <AccordionItem :item-id="1">
          <template slot="header"> Item A </template>
          <template slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            finibus auctor massa, vitae posuere sem tincidunt eget. Duis non
            vestibulum diam. Pellentesque eleifend interdum mollis. Donec
            porttitor dui enim. Maecenas a semper sem. Nunc molestie turpis
            vitae sem auctor, non venenatis velit ultricies.
          </template>
        </AccordionItem>
        <AccordionItem :item-id="2">
          <template slot="header"> Item B </template>
          <template slot="content">
            Vestibulum nec urna non nisi viverra vehicula ut sed metus. Cras
            scelerisque condimentum nunc ut mattis. Curabitur euismod sagittis
            efficitur. Cras vel orci consectetur, ullamcorper magna vitae,
            sodales mauris. Aliquam tempus volutpat mi. Nunc vitae molestie
            ante. In sed varius tortor.
          </template>
        </AccordionItem>
        <AccordionItem :item-id="3">
          <template slot="header"> Item C </template>
          <template slot="content">
            Sed porttitor mattis egestas. Duis nec rhoncus ligula. Etiam
            pellentesque mattis mauris. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Maecenas vel
            dapibus nulla. Phasellus lobortis nibh et faucibus tincidunt.
            Phasellus non iaculis turpis, vitae gravida lacus.
          </template>
        </AccordionItem>
      </AccordionList>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style src="../assets/css/advanced.css" />
