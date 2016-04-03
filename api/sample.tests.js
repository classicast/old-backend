import { expect } from 'chai';

import { myFunc } from './sample';

describe('dummy test', () => {
  it('should result in truth', () => {
    expect(myFunc('foo')).to.equal('foo');
  });
});
