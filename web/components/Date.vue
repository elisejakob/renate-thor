<template>
  <span>{{ date }}</span>
</template>

<script>
export default {
  props: {
    rawDate: String,
    journal: Boolean,
    yearonly: Boolean
  },
  data() {
    return {
      monthnames: {
        full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    }
  },
  computed: {
    date() {
      const dateObject = new Date(this.rawDate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      const monthnumber = dateObject.getMonth() +1;
      if (this.journal) {
        return this.monthnames.short[month] + " " + day + ", " + year
      }
      if (this.yearonly) {
        return year
      }
      return day + "." + monthnumber + "." + year
    }
  }
}
</script>
