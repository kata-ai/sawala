# Getting Started

## Install

```bash
# npm
$ npm install --save sawala

# yarn
$ yarn add sawala
```

## How to use

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
