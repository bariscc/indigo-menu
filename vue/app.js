const menuItems = [
    {
      title: "My Schedule & Bidding",
      subItems: [],
    },
    {
      title: "Safety",
      subItems: [
        {
          title: "Reporting",
          subItems: [
            {
              title: "I-21 Injury Reporting",
              link: "#"
            },
            {
              title: "ASAP Reporting",
              link: "#"
            },
            {
              title: "General ASAP Information",
              link: "#"
            },
            {
              title: "Flight Attendant Incident Report",
              link: "#"
            },
          ],
        },
        {
          title: "Agriculture and Customs",
          subItems: []
        },
        {
          title: "Known Crewmember",
          link: "#"
        },
        {
          title: "Product Safety Data Search",
          link: "#"
        },
      ]
    },
    {
      title: "Training",
      link: "#"
    },
    {
      title: "Administration",
      subItems: [
        {
          title: "OJI and Leaves",
          subItems: [],
        },
        {
          title: "Pay and benefits",
          subItems: [],
        },
        {
          title: "Performance",
          subItems: [],
        },
        {
          title: "Inflight Resource Directory",
          link: '#',
        },
        {
          title: "Mobile and Web",
          subItems: [],
        },
        {
          title: "AFA",
          link: '#',
        },
      ]
    },
    {
      title: "Catering & Brand",
      subItems: [],
    },
    {
      title: "Hotels",
      link: '#',
    },
    {
      title: "My Base",
      link: '#',
    },
    {
      title: "Recognition",
      link: '#',
    },
    {
      title: "My Leadership Team",
      link: '#',
    }
  ];

new Vue({
  el: '#app',
  data: {
    menuItems: menuItems,
    user: 'Donovan Beck',
    logoPath: '../dist/assets/logo.png',
    menuOpen: false,
    tabOpen: 0,
    tabTitle: "",
  },  
  methods: {
    toggleMenu: function() {
      this.menuOpen ? this.resetMenu() : this.menuOpen = !this.menuOpen;
    },
    toggleTab: function(idx) {
        this.tabOpen = idx
        this.tabTitle = idx ? menuItems[idx-1].title : ""
    },
    resetMenu: function() {
        this.menuOpen = false,
        this.tabOpen = 0;
        this.tabTitle = '';
    },
    tabPaneClick: function(e) {
      if(e.target.id === 'tab-pane') {
        this.toggleTab(0)
      }
    }
  },
})