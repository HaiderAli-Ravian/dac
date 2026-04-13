export const getCarImageUrl = (make: string, model: string, year: number): string => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make.toLowerCase());
  url.searchParams.append('modelFamily', model.split(' ')[0].toLowerCase());
  url.searchParams.append('modelYear', String(year));
  url.searchParams.append('zoomType', 'fullscreen');
  return url.toString();
};
