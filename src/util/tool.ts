export const convertDate = (date: string) => new Date(date.slice(0, -6))

export const slicedBundle = (gap: number, array: any[]) => {
  let temp = [];
  for (let i = 0; i < array.length; i += gap) {
    temp.push(array.slice(i, gap + i));
  }
  return temp;
};

export const slugToBlogTrailingSlash = (slug: string) => {
  const isTrailingSlash = slug.startsWith('/') && slug.endsWith('/');
  const trailingSlash = isTrailingSlash ? '' : '/'
  return `/blog${trailingSlash}${slug}`
}

export const duplicateRemoveArray = (array: any[]) =>
  array.reduce((acc, cur) => {
    for (let category of cur.frontmatter.categories) {
      if (acc.includes(category)) continue;
      acc.push(category);
    }
    return acc;
  }, []);
