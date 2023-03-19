import { Configuration } from 'tslint';
import { Jet } from '../index';
const jet = new Jet({ baseUrl: 'https://jsonplaceholder.typicode.com/' });

test('headers', () => {
  expect(typeof jet._getHeaders()).toBe('object');
});

test('get', () => {
  expect(jet.get('todos/1')).toBeInstanceOf(Promise<{ res: Object; response: Object }>);
});

test('post request', () => {
  let body = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  const resp = jet.post('todos/1', body);
  expect(resp).toBeInstanceOf(Promise<{ res: Object; response: Object }>);
});

test('post request secured', () => {
  jet.token = 'thisismytesttokenthathastobeattachedintheheadersoftherequest';
  let body = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  expect(jet.posts('posts/', body)).toBeInstanceOf(Promise<{ res: Object; response: Object }>);
});

/**
 * test if given a token, it gets added to the headers
 */
test('token is attached', () => {
  jet.token = 'mysampletokenhere';
  expect(jet.attachAuthorisation()).toBeInstanceOf(Object);
});
