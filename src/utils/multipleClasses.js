export const multipleClasses = (classes) =>
   classes
      .filter((item) => item !== '')
      .join(' ')
      .trim()
