<template>
  <div class="col-md-12 col-lg-8 col-xl-9">
    <!-- Doctor Widget -->
    <div class="card" v-for="item in search" :key="item.id">
      <div class="card-body">
        <div class="doctor-widget">
          <div class="doc-info-left">
            <div class="doctor-img">
              <router-link to="doctor-profile">
                <img
                  :src="require(`@/assets/img/doctors/${item.DoctorImg}`)"
                  class="img-fluid"
                  alt="User Image"
                />
              </router-link>
            </div>
            <div class="doc-info-cont">
              <h4 class="doc-name">
                <router-link to="doctor-profile">{{ item.DoctorName }}</router-link>
              </h4>
              <p class="doc-speciality">{{ item.Role }}</p>
              <h5 class="doc-department">
                <img
                  :src="require(`@/assets/img/specialities/${item.SpecialityImg}`)"
                  class="img-fluid"
                  alt="Speciality"
                />{{ item.Speciality }}
              </h5>
              <div class="rating">
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled ms-1"></i>
                <i class="fas fa-star filled ms-1"></i>
                <i class="fas fa-star filled ms-1"></i>
                <i class="fas fa-star ms-1"></i>
                <span class="d-inline-block average-rating ms-1">{{ item.Views }}</span>
              </div>
              <div class="clinic-details">
                <p class="doc-location">
                  <i class="fas fa-map-marker-alt"></i> {{ item.Location }}
                </p>
                <ul class="clinic-gallery">
                  <li
                    class="ms-1"
                    v-for="(image, index) in galleryImages"
                    :key="index"
                    @click="() => show(index)"
                  >
                    <a data-fancybox="gallery">
                      <img
                        :src="require(`@/assets/img/features/${image.src}`)"
                        alt="Feature"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div class="clinic-services">
                <span>Dental Fillings</span>
                <span> Whitneing</span>
              </div>
            </div>
          </div>
          <div class="doc-info-right">
            <div class="clini-infos">
              <ul>
                <li><i class="far fa-thumbs-up"></i> {{ item.percentage }}</li>
                <li><i class="far fa-comment"></i> {{ item.Feedback }}</li>
                <li><i class="fas fa-map-marker-alt"></i> {{ item.Location }}</li>
                <li>
                  <i class="far fa-money-bill-alt"></i> {{ item.Price }}
                  <i
                    class="fas fa-info-circle"
                    data-bs-toggle="tooltip"
                    title="Lorem Ipsum"
                  ></i>
                </li>
              </ul>
            </div>
            <div class="clinic-booking">
              <router-link class="view-pro-btn" to="doctor-profile"
                >View Profile</router-link
              >
              <router-link class="apt-btn" to="booking">Book Appointment</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Doctor Widget -->
    <div class="load-more text-center">
      <a class="btn btn-primary btn-sm prime-btn" href="javascript:void(0);">Load More</a>
    </div>
    <vue-easy-lightbox
      :visible="visible"
      :index="index"
      :imgs="
        galleryImages.map((image) => ({
          src: require(`@/assets/img/features/${image.src}`),
        }))"
      @hide="visible = false"
      @on-prev="handlePrev"
      @on-next="handleNext"
    >
    </vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import search from "@/assets/json/searchdoctor/search.json";
export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      search: search,
      visible: false,
      index: 0,
      galleryImages: [
        {
          src: "feature-01.jpg",
        },
        {
          src: "feature-02.jpg",
        },
        {
          src: "feature-03.jpg",
        },
        {
          src: "feature-04.jpg",
        },
      ],
    };
  },

};
</script>
