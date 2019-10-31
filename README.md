# Sawala

**Sawala** is an Wrapper of [Qiscus Chat SDK](https://github.com/qiscus/qiscus-sdk-web-core) using the React framework. It's designed for Kata Internal needs.

**Note: Sawala is still in beta.**

---

## Documentation

- [Introduction](./docs/introduction.md)
- [Getting Started](./docs/getting-started.md)
- [Contributing](./docs/contributing.md)

## Contributing

Sawala is developed by the help of developers like you! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started on developing Sawala.

This project is bound by a [Code of Conduct](CODE_OF_CONDUCT.md).

## Usage

### Install

```bash
# npm
$ npm install --save sawala

# yarn
$ yarn add sawala
```

### How to use

Sawala is built in React, you can use it like this example:

```jsx
import * as React from 'react';
import { SawalaChat } from 'sawala';
import { EmptyMessage } from '@kata-kit/common';

export default class Chat extends React.Component<Props> {
  renderEmptyRoom = () => {
    return (
      <EmptyMessage
        image={require('assets/images/no-page.svg')}
        title={'No chat selected'}
      >
        Please select chat first.
      </EmptyMessage>
    );
  };

  render() {
    return (
      <SawalaChat
        config={{
          autoConnect: true,
          appId: 'sdksample',
          user: {
            id: 'rohmad@kata.ai',
            password: 'q1w2e3r4',
            displayName: 'Rohmad from Kata.ai',
            avatar:
              'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png'
          }
        }}
        onClickHeaderDetail={this.handleClickHeaderDetail}
        onClickHeaderAgent={this.handleClickHeaderAgent}
        onClickDetailComment={this.handleClickDetailComment}
        onClickResolved={this.handleClickResolved}
        onRendered={this.handleRendered}
        noSelectedComponent={this.renderEmptyRoom()}
        loginSuccessCallback={this.handleloginSuccessCallback}
        newMessagesCallback={this.handlenewMessagesCallback}
      />
    );
  }
}
```

## License

By default, the root level of this repo, as well as the demo site, are licensed under the [Apache 2.0 license](LICENSE). While most components use the same license, please note that some packages (like our assets package) may use a different license. Any overriding licenses for each package will be mentioned in the `LICENSE` file located at the root of each package.

Copyright (c) 2019 Kata.ai and/or contributors. All rights reserved.

## Maintainers

- Rohmad Sasmito ([@rohmad-st](https://github.com/rohmad-st)) – [Kata.ai](https://kata.ai)
