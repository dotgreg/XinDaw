import * as React from 'react';

import DawPage from 'src/pages/dawPage';
import HomePage from 'src/pages/homePage';
import DbEditPage from 'src/pages/db/edit/DbEditPage';
import DbInitPage from 'src/pages/db/init/DbInitPage';
import { HashRouter, Route } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import s from 'src/styles';

class AppRouter extends React.Component<{}, {}> {
    public render() {
        return (
        <div> 
            <HashRouter>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/daw" component={DawPage} />
                    <Route path="/db" component={DbEditPage} />
                    <Route path="/init" component={DbInitPage} />
                </div>
            </HashRouter>
        </div>
        );
    } 
}

injectGlobal`
    ${s.global}
`


export default AppRouter;
