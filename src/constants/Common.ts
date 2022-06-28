class Common {
  getImageList() {
    return [
      {
        image: '',
      },
      {
        image: '',
      },
      {
        image: '',
      },
      {
        image: '',
      },
    ];
  }

  getDistrictFooterTabs() {
    return [
      {
        label: 'History',
        icon: 'auto-stories',
        focused: true,
      },
      {
        label: 'Tourism',
        icon: 'airport-shuttle',
        focused: false,
      },
      {
        label: 'Festivals',
        icon: 'celebration',
        focused: false,
      },
      {
        label: 'Food',
        icon: 'restaurant-menu',
        focused: false,
      },
    ];
  }

  getGodFooterTabs() {
    return [
      {
        label: 'History',
        icon: 'auto-stories',
        focused: true,
      },
      {
        label: 'Nick Name',
        icon: 'spellcheck',
        focused: false,
      },
    ];
  }

  getAccountFooterTabs(){
    return [
      {
          label: 'Profile',
          icon: 'account-circle',
          focused: true
      },
      {
          label: 'Suggestions',
          icon: 'chat',
          focused: false
      },
      {
          label: 'About',
          icon: 'info',
          focused: false
      }
  ];
  }
}

export default new Common();
