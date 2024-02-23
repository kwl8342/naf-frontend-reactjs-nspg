const menu = [
  {
    heading: 'Monitoring'
  },
  {
    icon: 'cards',
    text: 'Executive Summary',
    newTab: false,
    subMenu: [
      {
        text: 'SolarWinds',
        link: '/executive-summary/solarwinds'
      }
    ]
  },
  {
    heading: 'Reporting'
  },
  {
    icon: 'db',
    text: 'Assets',
    newTab: false,
    subMenu: [
      {
        text: 'Hardware',
        link: '/assets/hardware'
      },
      {
        text: 'Sites',
        link: '/assets/sites'
      }
    ]
  },
  {
    icon: 'network',
    text: 'Cisco DNA Center',
    newTab: false,
    subMenu: [
      {
        text: 'Access Points',
        link: '/cisco-dna-center/access-points'
      },
      {
        text: 'Client Details',
        link: '/cisco-dna-center/client-details'
      }
    ]
  },
  {
    icon: 'policy',
    text: 'Network Audits',
    newTab: false,
    subMenu: [
      {
        text: 'Compliance',
        link: '/network-audits/compliance'
      },
      {
        text: 'Infrastructure',
        link: '/network-audits/infrastructure'
      },
      {
        text: 'Results',
        newTab: false,
        subMenu: [
          {
            text: 'Devices',
            link: '/network-audits/results-devices'
          },
          {
            text: 'Scores',
            link: '/network-audits/results-scores'
          },
          {
            text: 'Sites',
            link: '/network-audits/results-sites'
          }
        ]
      },
      {
        text: 'KPIs',
        link: '/network-audits/kpis'
      },
      {
        text: 'Reports',
        link: '/network-audits/reports'
      }
    ]
  },
  {
    icon: 'wifi',
    text: 'Wireless',
    newTab: false,
    subMenu: [
      {
        text: 'Endpoint Client Count',
        link: '/wireless/endpoint-client-count'
      },
      {
        text: 'Performance Dashboard',
        link: '/wireless/performance-dashboard'
      },
      {
        text: 'Stats',
        link: '/wireless/stats'
      }
    ]
  }
];
export default menu;
