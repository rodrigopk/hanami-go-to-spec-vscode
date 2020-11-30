import * as resolver from './resolver';

const testCases = [
  {
    specFile: '/spec/api/controllers/foo/create_spec.rb',
    codeFile: '/apps/api/controllers/foo/create.rb',
  },
  {
    specFile: '/spec/api/views/foo/create_spec.rb',
    codeFile: '/apps/api/views/foo/create.rb',
  },
  {
    specFile: '/spec/lib/project/something/foo_spec.rb', 
    codeFile: '/lib/project/something/foo.rb'
  },
  {
    specFile: '/spec/lib/other_project/something_else/foo_spec.rb',
    codeFile: '/lib/other_project/something_else/foo.rb',
  },
];

describe('isSpec', () => {
  testCases.forEach((testCase) => {
    it('returns if is spec', () => {
      expect(resolver.isSpec(testCase.specFile)).toBeTruthy();
      expect(resolver.isSpec(testCase.codeFile)).toBeFalsy();
    });    
  });
});

describe('specToCode', () => {
  testCases.forEach((testCase) => {
    it ('gets the spec file for the code', () => {
      expect(resolver.specToCode(testCase.specFile)).toEqual(testCase.codeFile);
    });
  });
});

describe('codeToSpec', () => {
  testCases.forEach((testCase) => {
    it('gets the spec file for the code', () => {
      expect(resolver.codeToSpec(testCase.codeFile)).toEqual(testCase.specFile);
    });
  });
});

describe('getRelated', () => {
  testCases.forEach((testCase) => {
    it('gets the correct related file', () => {
      expect(resolver.getRelated(testCase.codeFile)).toEqual(testCase.specFile);
      expect(resolver.getRelated(testCase.specFile)).toEqual(testCase.codeFile);
    });
  });
});
