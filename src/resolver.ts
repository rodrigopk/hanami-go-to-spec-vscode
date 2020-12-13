export const getRelated = (file: string, appsList: string[]) => {
  if (isSpec(file)) {
    return specToCode(file, appsList);
  } else {
    return codeToSpec(file);
  }
};

export const isSpec = (file: string) => {
  return file.indexOf('_spec.rb') > -1;
};

const getProjectNameFromSpec = (specFile: string) => {
  const substring = specFile.replace('spec/', '');

  return substring.substring(0, substring.indexOf('/'));
};

export const specToCode = (specFile: string, appsList: string[]) => {
  const file = specFile.replace('_spec.rb', '.rb');
  const projectName = getProjectNameFromSpec(specFile);

  const isAppFile = appsList.includes(projectName);
  if (isAppFile) {
    return file.replace('spec/', 'apps/');
  }

  return file.replace('spec/', 'lib/');
};

export const codeToSpec = (codeFile: string) => {
  const file = codeFile.replace('.rb', '_spec.rb');

  const isLibFile = file.indexOf('lib/') > -1;
  if (isLibFile) {
    return file.replace('lib/', 'spec/');
  }

  return file.replace('apps/', 'spec/');
};
