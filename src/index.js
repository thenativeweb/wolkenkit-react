import React from 'react';
import wolkenkit from 'wolkenkit-client';

let connection;

export const withWolkenkit = ({host, port, protocol}) => Component =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                connectionEstablished: connection || false
            };
        }

        async componentDidMount() {
            if (!connection) {
                try {
                    connection = await wolkenkit.connect({
                        host,
                        port,
                        protocol
                    });
                    this.setState({connectionEstablished: true});
                } catch (error) {
                    throw error;
                }
            }
        }

        render() {
            if (!this.state.connectionEstablished) return null;
            return <Component application={connection}/>
        }
    };

export default withWolkenkit;