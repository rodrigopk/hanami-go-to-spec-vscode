export const getRelated = (file: string) => {
  if (isSpec(file)) {
    return specToCode(file);
  } else {
    return codeToSpec(file);
  }
};

export const isSpec = (file: string) => {
  return file.indexOf('_spec.rb') > -1;
};

export const specToCode = (specFile: string) => {
  const file = specFile.replace('_spec.rb', '.rb');

  const isLibFile = file.indexOf('/spec/lib/') > -1;
  if (isLibFile) {
    return file.replace('/spec/lib/', '/lib/');
  }

  return file.replace('/spec/', '/apps/');
};

export const codeToSpec = (codeFile: string) => {
  const file = codeFile.replace('.rb', '_spec.rb');

  const isLibFile = file.indexOf('/lib/') > -1;
  if (isLibFile) {
    return file.replace('/lib/', '/spec/lib/');
  }

  return file.replace('/apps/', '/spec/');
};
