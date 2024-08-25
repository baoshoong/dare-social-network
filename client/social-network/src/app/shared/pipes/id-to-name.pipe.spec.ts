import { IdToNamePipe } from './id-to-name.pipe';

describe('IdToNamePipe', () => {
  it('create an instance', () => {
    let pipe: IdToNamePipe;
    // @ts-ignore
    pipe = new IdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
