<script setup>
const displayStore = useDisplayStore()
const { t, locales, setLocale } = useI18n();

useSeoMeta({
  title: t("AboutUs.PageTitle"),
  ogTitle: t("AboutUs.PageTitle"),
  description: t("AboutUs.PageDescription"),
  ogDescription: t("AboutUs.PageDescription"),
})

</script>

<template>
    <v-container :class="!displayStore.isMobile ? 'py-8' : 'zero-padding'" fluid>
      <v-card elevation="4" :style="{ fontSize: displayStore.isMobile ? 'unset': '', borderRadius: !displayStore.isMobile ? '16px' : 0 }" class="about-card">
        <!-- Header Section -->
        <v-card-title :style="{ fontSize: displayStore.isMobile ? '28px': '' }" class="about-title text-center">
          {{$t("AboutUs.aboutLibtune")}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text :style="{paddingLeft: displayStore.isMobile ? '10px' : '40px', paddingRight: displayStore.isMobile ? '10px' : '40px' }">
          <!-- Introduction -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <p :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="intro">
              {{$t("AboutUs.intro")}}
            </p>
          </section>

          <!-- Commitment Section -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <h2 v-if="!displayStore.isMobile" class="section-title">{{$t("AboutUs.commitments.title")}}</h2>
            <h3 v-else style="margin-bottom: 8px;">{{$t("AboutUs.commitments.title")}}</h3>
            <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="features-list">
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">{{$t("AboutUs.no")}}</strong> {{$t("AboutUs.commitments.1")}}
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">{{$t("AboutUs.no")}}</strong> {{$t("AboutUs.commitments.2")}}
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">{{$t("AboutUs.no")}}</strong> {{$t("AboutUs.commitments.3")}} 
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">{{$t("AboutUs.any")}}</strong> {{$t("AboutUs.commitments.4")}}
              </li>
            </ul>
          </section>
  
          <!-- Features Section -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <h2  v-if="!displayStore.isMobile" class="section-title">{{$t("AboutUs.features.title")}}</h2>
            <h3 v-else style="margin-bottom: 8px;">{{$t("AboutUs.features.title")}}</h3>
            <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="features-list">
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-music</v-icon>
                {{$t("AboutUs.features.1")}}
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-license</v-icon>
                {{$t("AboutUs.features.2")}}
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-download</v-icon>
                {{$t("AboutUs.features.3")}}
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-account-check</v-icon>
                {{$t("AboutUs.features.4")}}
              </li>
            </ul>
          </section>
          
          <!-- Contact Section -->
        <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section contact">
          <h2 :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="section-title">{{$t("AboutUs.contact")}}</h2>
          <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="contact-list">
            <li>
              <v-icon color="blue darken-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="contact-icon">mdi-email</v-icon>
              <strong>{{$t("AboutUs.email")}}:</strong> <a href="mailto:support@libtune.com">support@libtune.com</a>
            </li>
          </ul>
        </section>
  
          <!-- Call to Action -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section cta">
            <h2 :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="section-title">{{$t("AboutUs.start")}}</h2>
            <v-btn color="primary" variant="elevated" large @click="goToPath('/subscribe')">
              {{$t("AboutUs.getPremium")}}
        </v-btn>
          </section>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <style scoped>
  .zero-padding{
    padding: 0
  }
  .about-card {
    max-width: 900px;
    margin: auto;
    border-radius: 12px;
    background-color: #ffffff;
    padding: 20px
  }
  
  .about-title {
    font-size: 32px;
    font-weight: bold;
    /* color: #4a148c; */
    margin-bottom: 16px;
  }
  
  .about-section {
    margin-top: 24px;
  }
  
  .intro {
    font-size: 18px;
    /* color: #555555; */
    line-height: 1.6;
    /* text-align: center; */
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    /* color: #673ab7; */
    margin-bottom: 16px;
  }
  
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .features-list li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 16px;
    color: #444444;
  }
  
  .feature-icon {
    margin-right: 12px;
    font-size: 24px;
  }
  
  .cta {
    text-align: center;
    margin-top: 32px;
  }
  
  .cta-btn {
    margin-top: 16px;
  }

  .contact {
  margin-top: 32px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;
  color: #444444;
}

.contact-icon {
  margin-right: 12px;
  font-size: 24px;
}
  </style>
  