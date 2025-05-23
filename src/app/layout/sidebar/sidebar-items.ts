import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.HOME.TEXT',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'dashboard/main',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD1',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard2',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD2',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard3',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD3',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },
  {
    path: 'advance-table',
    title: 'MENUITEMS.ADVANCE-TABLE.TEXT',
    icon: 'trello',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  {
    path: '',
    title: '-- Pages',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [],
  },
  {
    path: '',
    title: 'Authentication',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/authentication/forgot-password',
        title: 'Forgot Password',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/authentication/locked',
        title: 'Locked',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/authentication/page404',
        title: '404 - Not Found',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/authentication/page500',
        title: '500 - Server Error',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Extra Pages',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Multi level Menu',
    icon: 'chevrons-down',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/multilevel/first1',
        title: 'First',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: '/',
        title: 'Second',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        submenu: [
          {
            path: '/multilevel/secondlevel/second1',
            title: 'Second 1',
            icon: '',
            class: 'ml-menu2',
            groupTitle: false,
            submenu: [],
          },
          {
            path: '/',
            title: 'Second 2',
            icon: '',
            class: 'ml-sub-menu2',
            groupTitle: false,
            submenu: [
              {
                path: '/multilevel/thirdlevel/third1',
                title: 'third 1',
                icon: '',
                class: 'ml-menu3',
                groupTitle: false,
                submenu: [],
              },
            ],
          },
          
        ],
      },
      {
        path: '/multilevel/first3',
        title: 'Third',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },
  {
    path:'',
    title:'Basic Data',
    icon:'briefcase',
    class:'menu-toggle',
    groupTitle:false,
    submenu:[{
      path:'/info/addProduct',
      title:'Create Product',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    },
    {
        path:'/info/addMaterial',
        title:'Create Material',
        icon:'',
        class:'',
        groupTitle:false,
        submenu:[]
        
    },
    {
      path:'info/addUnit',
      title:'Create Unit',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    },
    {
      path:'info/addPort',
      title:"Define port",
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    },
    {
      path:'info/showProduct',
      title:'Show Products',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    },
    {
      path:'info/addAccount',
      title:'add account',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    }
  ]
  },
  {
    path:'declarAccount',
    title:'Accounts Managment',
    icon:'copy',
    class:'menu-toggle',
    groupTitle:false,
    submenu:[{
      path:'declarAccount/account',
      title:'Creat Account',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    }]
  },
  {
    path:'',
    title:'Make Order',
    icon:'copy',
    class:'menu-toggle',
    groupTitle:false,
    submenu:[{
      path:'makeOrder/order',
      title:'Create Order',
      icon:'',
      class:'',
      groupTitle:false,
      submenu:[]
    }]
  }
];
