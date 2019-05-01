import * as React from 'react';
let dbObj = require('./initDb.json')

interface Props {
  path?: string
  history?: any
}

let defaultDbString = JSON.stringify(dbObj)

class DbInitPage extends React.Component<Props, {}> {
  
  constructor(props) {
    super(props)
    window.localStorage.setItem('DawPage', defaultDbString)
    window.localStorage.setItem('e', defaultDbString)
    setTimeout(() => {
      this.props.history.push('/daw')
    }, 2000)
  }

  public render() {
    return (
        <div>
            <h3>Init Default DB page</h3>
            <p> inject some default sounds to get started with...</p>
        </div>
    );
  } 
}

  
  
export default DbInitPage;
  