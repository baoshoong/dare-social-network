import { IdToNamePipe } from './id-to-name.pipe';

describe('IdToNamePipe', () => {
  it('create an instance', () => {
    let pipe: IdToNamePipe;
    pipe = new IdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
