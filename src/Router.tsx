import * as React from 'react';
import { Router as ReachRouter } from "@reach/router"

import DawPage from 'src/pages/dawPage';
import DbEditPage from 'src/pages/dbEditPage';
import HomePage from 'src/pages/homePage';

class Router extends React.Component<{}, {}> {
    public render() {
        return (
        <div> 
            <ReachRouter>
                <HomePage path="/" />
                <DawPage path="/daw" />
                <DbEditPage path="/db" />
            </ReachRouter>
        </div>
        );
    } 
}

  
  
  export default Router;
  