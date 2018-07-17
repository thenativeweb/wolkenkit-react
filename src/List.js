import React from "react";
import {wolkenkitConnect} from "./wolkenkitConnect";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultSet: []
    };
  }
  componentDidMount() {
    const { application } = this.props;
    const {
      observe = false,
      name,
      where = {},
      id,
      orderBy,
      skip,
      take
    } = this.props;

    const list = application.lists[name];

    if (id) {
      // Read single item
      where["id"] = id;
      list
        .readOne({ where })
        .finished(resultSet => this.setState({ resultSet: [resultSet] }))
        .failed(error => console.error(`Error in list ${name}: ${error}`));
    } else {
      if (!observe) {
        // Read collection
        list
          .read({ where, orderBy, skip, take })
          .started(resultSet => this.setState({ resultSet }))
          .updated(resultSet => this.setState({ resultSet }))
          .failed(error => console.error(`Error in list ${name}: ${error}`));
      } else {
        // Observe collection
        list
          .readAndObserve({ where, orderBy, skip, take })
          .started(resultSet => this.setState({ resultSet }))
          .updated(resultSet => this.setState({ resultSet }))
          .failed(error => console.error(`Error in list ${name}: ${error}`));
      }
    }
  }

  render() {
    return this.props.children(this.state.resultSet);
  }
}

const ListWithApplication = wolkenkitConnect()(List);

export {ListWithApplication as List};
