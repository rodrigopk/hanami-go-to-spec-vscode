import test from 'ava';

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

test('isSpec', (test) => {
  test.plan(testCases.length * 2);
  
  testCases.forEach((testCase) => {
    test.is(resolver.isSpec(testCase.specFile), true);
    test.is(resolver.isSpec(testCase.codeFile), false);
  });
});

test('specToCode', (test) => {
  test.plan(testCases.length);

  testCases.forEach((testCase) => {
    test.is(resolver.specToCode(testCase.specFile), testCase.codeFile);
  });
});

test('codeToSpec', (test) => {
  test.plan(testCases.length);

  testCases.forEach((testCase) => {
    test.is(resolver.codeToSpec(testCase.codeFile), testCase.specFile);
  });
});

test('getRelated', (test) => {
  test.plan(testCases.length * 2);

  testCases.forEach((testCase) => {
    test.is(resolver.getRelated(testCase.codeFile), testCase.specFile);
    test.is(resolver.getRelated(testCase.specFile), testCase.codeFile);
  });
});
