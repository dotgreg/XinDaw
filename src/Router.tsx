import * as React from 'react';
import { Router as ReachRouter } from "@reach/router"

import DawPage from 'src/pages/dawPage';
import HomePage from 'src/pages/homePage';
import DbEditPage from 'src/pages/db/edit/DbEditPage';
import DbInitPage from 'src/pages/db/init/DbInitPage';

class Router extends React.Component<{}, {}> {
    public render() {
        return (
        <div> 
            <ReachRouter>
                <HomePage path="/" />
                <DawPage path="/daw" />
                <DbEditPage path="/db" />
                <DbInitPage path="/init" />
            </ReachRouter>
        </div>
        );
    } 
}

  
  
  export default Router;
  