export const getOneOrMorePathnamesFromURL = (
  fullPathname: string,
  whichPathnameWillReturn: number | number[]
) => {
  const pathsNamesToReturn = Array.isArray(whichPathnameWillReturn)
    ? [...whichPathnameWillReturn]
    : [whichPathnameWillReturn];

  const splitPathnameByBar = fullPathname
    .split("/")
    .filter((pathname) => pathname);

  return splitPathnameByBar.filter((_, ind) =>
    pathsNamesToReturn.includes(ind)
  );
};
