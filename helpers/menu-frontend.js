
const getMenuFrontend = (role) => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          subMenu: [
            {
              title: 'Main',
              url: '/'
            },
            {
              title: 'Progressbarr',
              url: 'progress'
            },
            {
              title: 'Graphs',
              url: 'graph1'
            }
          ]
        },
        {
          title: 'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          subMenu: [
            // {
            //   title: 'Users',
            //   url: 'users'
            // },
            {
              title: 'Hospitals',
              url: 'hospitals'
            },
            {
              title: 'Doctors',
              url: 'doctors'
            }
          ]
        }
    ];

    if(role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({title: 'Users',url: 'users'});
    }

    return menu;
}

module.exports = {getMenuFrontend}
