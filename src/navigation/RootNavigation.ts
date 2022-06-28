import * as React from 'react';

class RootNavigation {
  navigationRef: any = React.createRef();

  navigate(name: any, params: any = {}) {
    this.navigationRef.current?.navigate(name, params);
  }

  resetRoot(name: any) {
    this.navigationRef.current?.resetRoot({ index: 0, routes: [{ name: name }] });
  }

  getRootState() {
    return this.navigationRef.current?.getRootState();
  }
}

export default new RootNavigation();
