/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { Bar } from 'vue-chartjs';

// Exporting this so it can be used in other components

export default {
  extends: Bar,
  props: ['chartdata'],
  data() {
    return {
      datacollection: {
        // Data to be represented on x-axis
        labels: [],
        datasets: [
          {
            label: 'Ongoing',
            backgroundColor: '#3eb507',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [],
          },
          {
            label: 'Closed',
            backgroundColor: '#b50707',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [],
          },
          {
            label: 'Canceled',
            backgroundColor: '#ff888',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [],
          },
        ],
      },
      // Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      dataArray: null,
      orderOngoing: [],
      orderClosed: [],
      orderCanceled: [],
      mitra: [],
    };
  },
  mounted() {
    // renderChart function renders the chart with the datacollection and options object.
    // Promise.all([
    //   this.renderChart(this.datacollection, this.options),
    //   this.cleanData(this.chartdata),
    // ]);
    const promise1 = new Promise((resolve, reject) => {
      resolve(this.cleanData(this.chartdata));
    }).then(() => {
      const orderOg = this.orderOngoing;
      const a = [];
      let previous;
      for (let index = 0; index < orderOg.length; index++) {
        const element = orderOg[index];
        if (element.username !== previous) {
          a.push(1);
        } else {
          a[a.length - 1]++;
        }
        previous = element.username;
      }
      return a;
    }).then((result) => {
      this.datacollection.datasets[0].data = result;
    }).then(() => {
      const orderOg = this.orderClosed;
      const a = [];
      let previous;
      for (let index = 0; index < orderOg.length; index++) {
        const element = orderOg[index];
        if (element.username !== previous) {
          a.push(1);
        } else {
          a[a.length - 1]++;
        }
        previous = element.username;
      }
      return a;
    })
      .then((result) => {
        this.datacollection.datasets[1].data = result;
      })
      .then(() => {
        const orderOg = this.orderCanceled;
        const a = [];
        let previous;
        for (let index = 0; index < orderOg.length; index++) {
          const element = orderOg[index];
          if (element.username !== previous) {
            a.push(1);
          } else {
            a[a.length - 1]++;
          }
          previous = element.username;
        }
        return a;
      })
      .then((result) => {
        this.datacollection.datasets[2].data = result;
      });
    promise1.then(() => this.renderChart(this.datacollection, this.options));
  },
  methods: {
    async cleanData(array) {
      const new_array = await Array.from(array).map(x => ({
        order_id: x.order_id,
        open_status: x.open_status,
        username: x.username,
      })).sort((x, y) => x.username > y.username);
      const name = await new_array.map(x => x.username).filter((v, i, a) => a.indexOf(v) === i);
      const result_1 = await new_array.filter(value => value.open_status === 1);
      const result_2 = await new_array.filter(value => value.open_status === 2);
      const result_3 = await new_array.filter(value => value.open_status === 3);
      this.orderOngoing = result_1;
      this.orderClosed = result_2;
      this.orderCanceled = result_3;
      this.datacollection.labels = name;
    },
    async dataPerMitra(array, mitra) {
      const result = await array.filter(value => value.username === mitra);
      return result;
    },
  },
};
