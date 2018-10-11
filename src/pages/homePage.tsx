import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  path?: string
}

class HomePage extends React.Component<Props, {}> {
  public render() {
    return (
        <div>
            <h3>Xindaw Home</h3>
            <ul>
                <li><Link to="daw">Daw</Link></li>
                <li><Link to="db">Edit Db</Link></li>
                <li><Link to="init">Init Db with examples</Link></li>
            </ul>
        </div>
    );
  } 
}

  
  
export default HomePage;
  