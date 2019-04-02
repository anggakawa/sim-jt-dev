<template>
  <div>
    <v-layout row wrap>
      <v-flex xs4 v-for="(item, index) in mitra"  v-bind:key="item.user_id">
        <v-card :color="card_color[index]">
          <v-card-title class="title">{{ item.user_description }}</v-card-title>
          <v-card-text>
            <p class="font-weight-medium font-italic">Rata-rata penyelesaian</p>
            <span class="font-weight-bold">{{ getTimelinePerMitra(item.username) }}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from '@/services/service.api.js';
import moment from 'moment';

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export default {
  data() {
    return {
      mitra: [],
      timelines: [],
      card_color: [
        '#00FFFF',
        '#f93446',
        '#e69588',
        '#edd824',
        '#3933ff',
        '#ff33bb',
        '#00FFFF',
        '#f93446',
        '#e69588',
        '#edd824',
        '#3933ff',
      ],
    };
  },
  methods: {
    getVendors() {
      axios.get('/vendors').then(result => this.mitra = result.data);
    },
    getTimelines() {
      axios.get('/mitra-history/timelines').then((result) => {
        this.timelines = result.data;
      });
    },
    getTimelinePerMitra(mitra) {
      const arrayperMitra = this.timelines.filter(value => value.username === mitra);
      const result = groupBy(arrayperMitra, 'order_id');
      const differences = [];
      let sum = 0;
      Object.keys(result).forEach((keys) => {
        const tickets = result[keys];
        const startDate = moment(tickets[0].date);
        const endDate = moment(tickets[tickets.length - 1].date);
        const difference = moment.duration(endDate.diff(startDate));
        differences.push(difference.asMilliseconds());
      });
      differences.forEach((value) => {
        sum += value;
      });
      const stats = moment.duration(sum / differences.length);
      return (`${stats.days()} hari, ${stats.hours()} jam, ${stats.minutes()} menit, ${stats.seconds()} detik`);
    },
  },
  mounted() {
    Promise.all([
      this.getVendors(),
      this.getTimelines(),
    ]);
  },
};
</script>
