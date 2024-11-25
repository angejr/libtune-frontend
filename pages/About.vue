<template>
    <v-container class="about-page" fluid>
      <v-card elevation="4" class="about-card">
        <!-- Header Section -->
        <v-card-title class="about-title text-center">
          About Libtune
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- Introduction -->
          <section class="about-section">
            <p class="intro">
              Libtune is your go-to platform for royalty-free, high-quality music. 
              Whether you're a content creator, podcaster, filmmaker, or a business professional, 
              we empower you with the freedom to enhance your projects with outstanding soundtracks. 
              Our mission is to make premium music accessible for all your creative endeavors, 
              while ensuring simplicity and professionalism.
            </p>
          </section>
  
          <!-- Features Section -->
          <section class="about-section">
            <h2 class="section-title">What Makes Us Unique?</h2>
            <ul class="features-list">
              <li>
                <v-icon color="deep-purple lighten-2" class="feature-icon">mdi-music</v-icon>
                A vast library of meticulously curated, high-quality tracks.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" class="feature-icon">mdi-license</v-icon>
                Royalty-free licensing for personal and commercial use.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" class="feature-icon">mdi-download</v-icon>
                Unlimited downloads with our affordable premium plan.
              </li>
              <li>
                <v-icon color="deep-purple lighten-2" class="feature-icon">mdi-account-check</v-icon>
                A seamless user experience with a customer-first approach.
              </li>
            </ul>
          </section>
  
          <!-- Commitment Section -->
          <section class="about-section">
            <h2 class="section-title">Our Commitment</h2>
            <p>
              At Libtune, we’re not just about music; we’re about creativity and empowerment.Our platform is designed to inspire your projects with high-quality soundtracks that bring them to life. 
              We are committed to providing transparent pricing, fair licensing, and exceptional support 
              to ensure your satisfaction and success.
            </p>
          </section>

          
          <!-- Contact Section -->
        <section class="about-section contact">
          <h2 class="section-title">Contact Us</h2>
          <p>
            We’d love to hear from you! Whether you have a question, feedback, or need assistance, 
            feel free to get in touch with us.
          </p>
          <ul class="contact-list">
            <li>
              <v-icon color="blue darken-2" class="contact-icon">mdi-email</v-icon>
              <strong>Email:</strong> <a href="mailto:support@libtune.com">support@libtune.com</a>
            </li>
            <li>
              <v-icon color="blue darken-2" class="contact-icon">mdi-phone</v-icon>
              <strong>Phone:</strong> +33 1 23 45 67 89
            </li>
            <li>
              <v-icon color="blue darken-2" class="contact-icon">mdi-map-marker</v-icon>
              <strong>Address:</strong> 123 Rue de la Musique, 75001 Paris, France
            </li>
          </ul>
          <p>
            Our support team is available Monday to Friday, 9 AM to 5 PM (CET). 
            We aim to respond to all inquiries within 24 hours.
          </p>
        </section>
  
          <!-- Call to Action -->
          <section class="about-section cta">
            <h2 class="section-title">Start Your Journey with Libtune</h2>
            <p>
              Ready to elevate your projects with exceptional music? Explore our library, 
              sign up for our premium plan, and let your creativity shine. With Libtune, 
              the soundtrack to your success is just a click away.
            </p>
            <v-btn color="primary" variant="elevated" large @click="goToPath('/subscribe')">
          Get Premium
        </v-btn>
          </section>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .about-page {
    padding: 24px;
  }
  
  .about-card {
    max-width: 800px;
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
    text-align: center;
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
  