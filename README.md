# wolkenkit-react

wolkenkit-react is a higher order component for the wolkenkit client.

## Table of contents

<!-- toc -->

- [Installation](#installation)
- [Sample usage](#sample-usage)
- [License](#license)

<!-- tocstop -->

## Installation

```shell
$ npm install --save wolkenkit-react
```

## Sample usage

```js
export class App extends React.Component {
  // ...
  componentDidMount() {
    const { application } = this.props;
    application.lists.messages
      .readAndObserve({
        orderBy: { timestamp: "descending" },
        take: 50
      })
      .failed(err => console.error(err))
      .started(this.setMessages)
      .updated(this.setMessages);
  }
  // ...
}
```

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).