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
              'https://res.cloudinary.com/kata-ai/image/upload/v1572663263/sawala/kata_favicon-02_zzldhx.png'
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

## Components

### SawalaChat

`SawalaChat` is the only component needed to use sawala. It will react dynamically to handle all features.

SawalaChat props:

| prop                 | type                                | required | description                                                                                         |
| -------------------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| config               | [AppConfig](#appconfig)             | true     | App Configuration for setup to [Qiscus Web SDK Core](https://github.com/qiscus/qiscus-sdk-web-core) |
| noSelectedComponent  | ReactElement                        | no       | React element for showing an empty state                                                            |
| headerComponent      | ReactElement                        | no       | React element for additional feature in Header. E.g: `Context menu`                                 |
| onRendered           | function([QiscusCore](#qiscuscore)) | yes      | Callback after Sawala successfully rendered, for example you can call method `qiscus.getNonce()`    |
| loginSuccessCallback | function([AuthData](#authdata))     | no       | Callback when you initiate to qiscus is success                                                     |
| newMessagesCallback  | function([messages](#messages))     | true     | Callback when you are have a new messages incoming                                                  |

#### AppConfig

```jsx
export type User = {
  id: string,
  password: string,
  displayName: string,
  avatar?: string
};

export type AppConfig = {
  autoConnect: boolean | true,
  appId: string,
  user?: User | null
};
```

#### QiscusCore

QiscusCore is response from qiscus-sdk-web-core. Look like this:

```json
{
  "events": {},
  "rooms": [],
  "selected": null,
  "room_name_id_map": {},
  "pendingCommentId": 0,
  "uploadedFiles": [],
  "chatmateStatus": null,
  "version": "WEB_2.8.36",
  "userData": {},
  "AppId": "esl-9qaeayalt99fccowr",
  "baseURL": "https://api.qiscus.com",
  "uploadURL": "https://api.qiscus.com/api/v2/sdk/upload",
  "mqttURL": "wss://mqtt.qiscus.com:1886/mqtt",
  "HTTPAdapter": null,
  "realtimeAdapter": {},
  "customEventAdapter": {},
  "isInit": false,
  "isSynced": false,
  "syncInterval": 5000,
  "sync": "socket",
  "httpsync": null,
  "eventsync": null,
  "extras": null,
  "last_received_comment_id": 0,
  "googleMapKey": "",
  "options": { "avatar": true },
  "UI": {},
  "mode": "widget",
  "avatar": true,
  "plugins": [],
  "isLogin": false,
  "isLoading": false,
  "emoji": false,
  "isTypingStatus": "",
  "customTemplate": false,
  "templateFunction": null,
  "debugMode": false,
  "debugMQTTMode": false,
  "lastReceiveMessages": [],
  "_customHeader": {},
  "syncAdapter": { "events": {} }
}
```

#### AuthData

AuthData also is response from qiscus-sdk-web-core. Look like this:

```json
{
  "user": {
    "app": {
      "code": "esl-9qaeayalt99fccowr",
      "id": 8216,
      "id_str": "8216",
      "name": "esl"
    },
    "avatar": {
      "avatar": {
        "url": "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png"
      }
    },
    "avatar_url": "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png",
    "email": "esl-9qaeayalt99fccowr_admin@qismo.com",
    "extras": {},
    "id": 64061322,
    "id_str": "64061322",
    "last_comment_id": 0,
    "last_comment_id_str": "0",
    "last_sync_event_id": 0,
    "pn_android_configured": true,
    "pn_ios_configured": true,
    "rtKey": "somestring",
    "token": "PiJ8ndNiZwDI7pLONsFF1572018149",
    "username": "User from Kata.ai"
  }
}
```

#### Messages

Messages also is response from qiscus-sdk-web-core. Look like this:

```json
[
  {
    "chat_type": "group",
    "comment_before_id": 80343513,
    "comment_before_id_str": "80343513",
    "created_at": "2019-10-31T02:21:06.138008Z",
    "disable_link_preview": false,
    "email": "esl-9qaeayalt99fccowr_admin@qismo.com",
    "extras": {},
    "id": 80541844,
    "id_str": "80541844",
    "is_public_channel": false,
    "message": "Contoh pesan masuk",
    "payload": {},
    "raw_room_name": "Rohmad Sasmito",
    "room_avatar": "https://avatars3.githubusercontent.com/u/10769688?s=100",
    "room_id": 4947400,
    "room_id_str": "4947400",
    "room_name": "Rohmad Sasmito",
    "room_options": null,
    "room_type": "group",
    "status": "sent",
    "timestamp": "2019-10-31T02:21:06Z",
    "topic_id": 4947400,
    "topic_id_str": "4947400",
    "type": "text",
    "unique_temp_id": "bq1572488465709",
    "unix_nano_timestamp": 1572488466138008000,
    "unix_timestamp": 1572488466,
    "user_avatar": "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png",
    "user_avatar_url": "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png",
    "user_id": 64061322,
    "user_id_str": "64061322",
    "username": "User from Kata.ai"
  }
]
```
