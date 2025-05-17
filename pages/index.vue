<script setup>
const { t, locales, setLocale } = useI18n();

useSeoMeta({
  title: "Libtune",
  ogTitle: "Libtune",
  description: t('Home.PageDescription'),
  ogDescription: t('Home.PageDescription'),
  ogSiteName: "Libtune",
});
</script>
<template>
  <MusicTable></MusicTable>
</template>

<style scoped></style>
