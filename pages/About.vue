<script setup>
const displayStore = useDisplayStore()
useSeoMeta({
  title: "About Us",
  ogTitle: "About Us",
  description: "Our mission is to make premium music accessible for all your creative projects, while ensuring simplicity and professionalism.",
  ogDescription: "Our mission is to make premium music accessible for all your creative projects, while ensuring simplicity and professionalism.",
})

</script>

<template>
    <v-container class="about-page" fluid>
      <v-card elevation="4" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-card">
        <!-- Header Section -->
        <v-card-title :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-title text-center">
          About Libtune
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text :style="{paddingLeft: displayStore.isMobile ? '10px' : '40px', paddingRight: displayStore.isMobile ? '10px' : '40px' }">
          <!-- Introduction -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <p :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="intro">
              Libtune is your go-to platform for royalty-free, high-quality music. 
              Whether you're a content creator, podcaster, filmmaker, or a business professional, 
              we empower you with the freedom to enhance your projects with outstanding soundtracks. 
              Our mission is to make premium music accessible for all your creative endeavors, 
              while ensuring simplicity and professionalism.
            </p>
          </section>

          <!-- Commitment Section -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <h2 v-if="!displayStore.isMobile" class="section-title">Pay once (per month), Use everywhere</h2>
            <h3 v-else style="margin-bottom: 8px;">Pay once (per month), Use everywhere</h3>
            <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="features-list">
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">NO</strong> Copyright strikes
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">NO</strong> Demonitizations
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">NO</strong> Royalties to Pay to anyone 
              </li>
              <li>
                <v-icon color="green" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-check-bold</v-icon>
                <strong style="margin-left:5px; margin-right:5px">ANY</strong> project you please
              </li>
            </ul>
          </section>
  
          <!-- Features Section -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section">
            <h2  v-if="!displayStore.isMobile" class="section-title">What Makes Us Unique?</h2>
            <h3 v-else style="margin-bottom: 8px;">What Makes Us Unique?</h3>
            <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="features-list">
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-music</v-icon>
                A vast library of meticulously curated, high-quality tracks.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-license</v-icon>
                Royalty-free licensing for personal and commercial use.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-download</v-icon>
                Unlimited downloads with our affordable premium plan.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="feature-icon">mdi-account-check</v-icon>
                A seamless user experience with a customer-first approach.
              </li>
            </ul>
          </section>
          
          <!-- Contact Section -->
        <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section contact">
          <h2 :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="section-title">Contact Us</h2>
          <ul :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="contact-list">
            <li>
              <v-icon color="blue darken-2" :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="contact-icon">mdi-email</v-icon>
              <strong>Email:</strong> <a href="mailto:support@libtune.com">support@libtune.com</a>
            </li>
          </ul>
        </section>
  
          <!-- Call to Action -->
          <section :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="about-section cta">
            <h2 :style="{ fontSize: displayStore.isMobile ? 'unset': '' }" class="section-title">Start Your Journey with Libtune</h2>
            <v-btn color="primary" variant="elevated" large @click="goToPath('/subscribe')">
          Get Premium
        </v-btn>
          </section>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <style scoped>
  .about-page {
    padding: 24px;
  }
  
  .about-card {
    max-width: 900px;
    margin: auto;
    border-radius: 12px;
    background-color: #ffffff;
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
  