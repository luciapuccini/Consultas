// Note: test renderer must be required after react-native.
import { filterByCareer } from '../src/utils/functions';

describe('FILTER BY CAREER', () => {
  const subjects = [
    {
      id: 1,
      name: 'matematicas',
      year: 1,
      careers: ['ISI', 'IQ'],
    },
    {
      id: 2,
      name: 'matematicas 2',
      year: 2,
      careers: ['ISI', 'IQ'],
    },
    {
      id: 3,
      name: 'matematica discreta',
      year: 1,
      careers: ['ISI'],
    },
    {
      id: 4,
      name: 'matematicas progre',
      year: 1,
      careers: ['IM'],
    },
  ];
  const serchTerms = ['IQ'];

  test('should filter by career', () => {
    const result = filterByCareer(subjects, serchTerms);

    expect(result).toBe([
      {
        careers: ['ISI', 'IQ'],
        id: 1,
        name: 'matematicas',
        year: 1,
      },
      {
        careers: ['ISI', 'IQ'],
        id: 2,
        name: 'matematicas 2',
        year: 2,
      },
    ]);
  });
});
