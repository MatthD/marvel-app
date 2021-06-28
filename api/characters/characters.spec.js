import { getUsefullcharactersInfo } from './characters';

describe('characters', () => {
  it('Should remove unsuported data type', () => {
    const filledWithUnwantedProp = [
      'uselessstring',
      42,
      {
        id: '123456789',
        name: 'randomName',
        description: ' lorem ipsum blabla',
        unwantedProp1: 42,
        unwantedProp2: 'randString',
      },
    ];
    const sanitized = getUsefullcharactersInfo(filledWithUnwantedProp);
    expect(sanitized).toHaveLength(1);
  });
  it("Should sanitize unwanted character's data we will send to front", () => {
    const filledWithUnwantedProp = [
      {
        id: '123456789',
        name: 'randomName',
        description: ' lorem ipsum blabla',
        unwantedProp1: 42,
        unwantedProp2: 'randString',
      },
    ];
    const sanitized = getUsefullcharactersInfo(filledWithUnwantedProp);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]).toEqual({
      id: '123456789',
      name: 'randomName',
      description: ' lorem ipsum blabla',
    });
  });
});
