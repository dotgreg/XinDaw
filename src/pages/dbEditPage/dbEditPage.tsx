import * as React from 'react';

interface Props {
  path?: string
}

import image from './assets/screenshot.jpg'

class DbEditPage extends React.Component<Props, {}> {
  public render() {
    return (
      <div> 
          <h3>LocalStorage DB manual edition Page</h3>
          <div>
            <img src={image}/>
          </div>
      </div>
    );
  } 
}

  
  
export default DbEditPage;
  