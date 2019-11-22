# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.5.7] - 2019/11/19

### Added

- **Image:** handle upload image per room conversation

## [0.5.6] - 2019/11/07

### Added

- **Message:** handle message type of json

### Changed

- **Message:** update style message type of file
- dont hide time in left position

## Removed

- **build:** remove unused scripts in `package.json`

## [0.5.5] - 2019/11/03

### Changed

- **docs:** update some badges

## [0.5.4] - 2019/11/03

### Added

- **build:** setup continuous integration tools
- **docs:** add some badges

## [0.5.3] - 2019/11/02

### Changed

- **test:** update unit test

## [0.5.2] - 2019/11/02

### Added

- **Props:**
- onSelectedRoom: callback after selected room using method `window.qiscus.setSelected`
- headerComponent: now user able to custom header room chat
- **test:** add unit test of some methods

### Changed

- **docs:** change avatar url
- **build:** exclude file tests in `rollup.config.js`

### Removed

- **Props:**
- onClickHeaderDetail
- onClickHeaderAgent
- onClickResolved

## [0.5.1] - 2019/11/01

### Changed

- **lightbox**: change caption from _"Qismo Chat"_ to _"Preview Image"_

## [0.5.0] - 2019/11/01

### Added

- **Main features:**
- Send message
- Delete message
- Reply message
- Image and file attachment
- Lightbox: Show preview ime

- **Methods UI:**
- chatTarget: _Chat target_
- setSelected: _Set selected_

- **Props:**
- config: _App Configuration for setup_
- onRendered: _Callback after Sawala successfully rendered_
- newMessagesCallback: _Callback when user have a new messages incoming_
- onClickDetailComment: _Callback when user click `Message Details` in message_
- noSelectedComponent: _Custom no selected chat room element_
- loginSuccessCallback: _Callback after user successfully logged in qiscus-sdk_
- onClickHeaderDetail: _when user click `Chat Details`_
- onClickHeaderAgent: _when user click `Assign/Remove Agent`_
- onClickResolved: _when user click `Resolved` button_

[unreleased]: https://github.com/kata-ai/sawala/compare/HEAD..v0.5.7#diff
[0.5.7]: https://github.com/kata-ai/sawala/compare/v0.5.7...v0.5.6#diff
[0.5.6]: https://github.com/kata-ai/sawala/compare/v0.5.6...v0.5.5#diff
[0.5.5]: https://github.com/kata-ai/sawala/compare/v0.5.5...v0.5.4#diff
[0.5.4]: https://github.com/kata-ai/sawala/compare/v0.5.4...v0.5.3#diff
[0.5.3]: https://github.com/kata-ai/sawala/compare/v0.5.3...v0.5.2#diff
[0.5.2]: https://github.com/kata-ai/sawala/compare/v0.5.2...v0.5.1#diff
[0.5.1]: https://github.com/kata-ai/sawala/compare/v0.5.1...v0.5.0#diff
[0.5.0]: https://github.com/kata-ai/sawala/compare/v0.5.0...v0.4.0#diff
