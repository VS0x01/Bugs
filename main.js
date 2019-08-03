new Vue({
    el: '#app',
    data: {
        bugs: [],
        count: 0,
        status: -1,
    },
    computed: {
        done: function () {
            return !this.status; //this.bugs.findIndex(bug => bug.fixed != false) === (-1);
        },
    },
    watch: {
        done: function (done) {
            if (done) this.bugs.forEach((bug) => {
                bug.disabled = true
            });
        }
    },
    methods: {
        update(bug) {
            this.count++;
            let mask = bug.fixed ? ~(1 << bug.id) & ((1 << this.bugs.length) - 1) : (1 << bug.id);
            let rand = Math.round(Math.random() * (1 << this.bugs.length));
            this.status = bug.fixed ? rand & mask : rand | mask;
            for (let i = 0; i < this.bugs.length; i++) {
                this.bugs[i].fixed = (1 << i) & this.status;
            }
        },
        refresh: function () {
            this.bugs = [];
            this.count = 0;
            this.status = -1;
            for (let i = 0; i < Math.round(Math.random() * 8 + 8); i++) {
                this.bugs.push({
                    id: i,
                    fixed: Math.round(Math.random()),
                    disabled: false,
                });
            }
        },
    },
    mounted: function () {
        this.refresh();
    },
});
