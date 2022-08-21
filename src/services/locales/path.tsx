/**
 * Get Localized Path
 * @param slug String
 * @param locale String
 * @returns String
 */
export const getLocalizedPath = (slug: string, locale: string) => {
  let navigateTo = `/${locale}/${slug}`;
  navigateTo = navigateTo.replace("//", "/");
  return navigateTo;
};
