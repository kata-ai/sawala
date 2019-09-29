import * as React from 'react';
import { QistaChat } from '..';
import renderer from 'react-test-renderer';
import { User } from 'types';

const USER: User = {
  app: { appId: 'testsdk' },
  email: 'rochmad.26@gmail.com',
  displayName: 'Rohmad',
  password: 'password'
};

test("Component should show 'red' text 'Hello World'", () => {
  const component = renderer.create(
    <QistaChat user={USER} appId={USER.app.appId} />
  );
  const testInstance = component.root;

  expect(testInstance.findByType(QistaChat).props.text).toBe('World');

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
