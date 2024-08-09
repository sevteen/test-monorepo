import { RequestIdMiddleware } from './request-id.middleware';

describe('ScopedLogMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestIdMiddleware()).toBeDefined();
  });
});
