# Contributing Guidelines

**Sawala** is open source, so every feature in Sawala is developed by your help. You too can help contribute to this project! This page describes how to setup the project on your computer for local development.

This project is bound by a [Code of Conduct](CODE_OF_CONDUCT.md).

## The Five Golden Rules

The simple steps of contributing to any GitHub project are as follows:

1. [Fork the repository](https://github.com/kata-ai/sawala/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push -u origin my-new-feature`
5. Create a [Pull Request](https://github.com/kata-ai/sawala/pulls)!

To keep your fork of in sync with this repository, [follow this guide](https://help.github.com/articles/syncing-a-fork/).

For members of the Kata.ai organization, or if you have push access to this repository, just clone directly from the repo and push your branches here. It's fine.

## Prerequisites

### Windows, macOS and Linux

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (8.0.0+)
- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- Text Editor with [EditorConfig](http://editorconfig.org/) & [Prettier](https://prettier.io/) support. (We recommend [Visual Studio Code](https://code.visualstudio.com/))

#### Prerequisite Check

Run these commands inside the Terminal (PowerShell/Command Prompt for Windows).

**Git:** You should see the version number:

```sh-session
$ git version
git version 2.18.0
```

**Node.js:** You should see the version number:

```sh-session
$ node -v
v10.16.3
```

**NPM:** You should see the version number:

```sh-session
$ npm -v
6.9.0
```

## Setting Up

First, you should clone the repository.

```sh-session
$ git clone https://github.com/kata-ai/sawala.git
```

After these repository has been cloned, `cd` into the repository:

```sh-session
$ cd sawala
```

Install the project's dependencies. Note that you can use NPM, or YARN:

```sh-session
$ npm
```

## Developing

### Developing Features

To start developing features, you have to run the Sawala in your another directory project.

```sh-session
$ npm i -D qista-test@file:../qista
```

```jsx
import * as React from 'react';
import { QistaChat } from 'qista-test';
import { EmptyMessage } from '@kata-kit/common';

export default class CmsContainer extends React.Component<Props> {
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
      <QistaChat
        config={{
          autoConnect: true,
          appId: 'sdksample',
          user: {
            id: 'rohmad@kata.ai',
            password: 'q1w2e3r4';
            displayName: 'Rohmad from Kata.ai',
            avatar: 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png'
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
    )
  }
}
```

Then, you should open your directory project with your domain app.

Example: http://localhost:3000
