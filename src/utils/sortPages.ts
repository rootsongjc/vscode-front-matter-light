import { Sorting } from '../helpers/Sorting';
import { SortOrder, SortType } from '../models';
import { Page } from '../helpers';

export const sortPages = (pages: Page[], sorting: any | null) => {
  if (sorting && sorting.id === 'fileNameAsc') {
    pages = pages.sort(Sorting.alphabetically('fmFileName'));
  } else if (sorting && sorting.id === 'fileNameDesc') {
    pages = pages.sort(Sorting.alphabetically('fmFileName')).reverse();
  } else if (sorting && sorting.id === 'publishedAsc') {
    pages = pages.sort(Sorting.numerically('fmPublished'));
  } else if (sorting && sorting.id === 'lastModifiedAsc') {
    pages = pages.sort(Sorting.numerically('fmModified'));
  } else if (sorting && sorting.id === 'publishedDesc') {
    pages = pages.sort(Sorting.numerically('fmPublished')).reverse();
  } else if (sorting && sorting.id === 'lastModifiedDesc') {
    pages = pages.sort(Sorting.numerically('fmModified')).reverse();
  } else if (sorting && sorting.id && sorting.name) {
    const { order, name, type } = sorting;

    if (type === SortType.string) {
      pages = pages.sort(Sorting.alphabetically(name));
    } else if (type === SortType.date) {
      pages = pages.sort(Sorting.date(name));
    } else if (type === SortType.number) {
      pages = pages.sort(Sorting.numerically(name));
    }

    if (order === SortOrder.desc) {
      pages = pages.reverse();
    }
  } else {
    pages = pages.sort(Sorting.numerically('fmModified')).reverse();
  }

  return pages;
};
