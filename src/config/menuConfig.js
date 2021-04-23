const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: '家常菜',
    key: '/admin/ordinary',
    children: [
      {
        title: '快手菜',
        key: '/admin/ordinary/quick'
      },
      {
        title: '下饭菜',
        key: '/admin/ordinary/meal'
      }
    ]
  },
  {
    title: '早餐',
    key: '/admin/breakfast'
  },
  {
    title: '肉',
    key: '/admin/meat',
    children: [
      {
        title: '猪肉',
        key: '/meat/pock'
      },
      {
        title: '鸡肉',
        key: '/admin/meat/chicken'
      },
      {
        title: '鸭肉',
        key: '/admin/meat/duck'
      },
      {
        title: '牛肉',
        key: '/admin/meat/beef'
      },
      {
        title: '羊肉',
        key: '/admin/meat/mutton'
      }
    ]
  },
  {
    title: '鱼',
    key: '/admin/fish'
  },
  {
    title: '蔬菜',
    key: '/admin/vegetables',
    children: [
      {
        title: '果实类蔬菜',
        key: '/admin/vegetables/fruits'
      },
      {
        title: '根茎蔬菜',
        key: '/admin/vegetables/roots'
      },
      {
        title: '菌菇类',
        key: '/admin/vegetables/mushrooms'
      },
      {
        title: '叶类蔬菜',
        key: '/admin/vegetables/leaves'
      }
    ]
  },
  {
    title: '汤羹',
    key: '/admin/soup'
  },
  {
    title: '烘焙',
    key: '/admin/bake'
  },
  {
    title: '主食',
    key: '/admin/staple'
  },
  {
    title: '面',
    key: '/admin/noodles'
  },
  {
    title: '素食',
    key: '/admin/vegetarian'
  }
];
export default menuList;
