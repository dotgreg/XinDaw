import * as React from 'react';

interface Props {
    onUpdate: Function;
}

class LocalStorageWatcher extends React.Component<Props> {
    int:any
    hist:any

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.int = setInterval(() => {
            let ls = window.localStorage
            let lsString = JSON.stringify(ls)
            if (this.hist === lsString) return
            this.props.onUpdate(ls)
            this.hist = lsString 
        }, 500)
    }

    componentWillUnmount(){
        clearInterval(this.int)
    }

    public render() {
        return (
        <div>
            LocalStorageWatcher
        </div>
        );
    }
}

export default LocalStorageWatcher;
