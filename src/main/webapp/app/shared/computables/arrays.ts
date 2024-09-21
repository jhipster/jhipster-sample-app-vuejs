const compareString = (a: string, b: string): number => {
  if (b == null) return 1;
  if (a == null) return -1;

  return a.localeCompare(b);
};

const asString = (val): string => {
  return typeof val === 'string' ? val : `${val}`;
};

const compareAny = (a, b): number => {
  if (b == null) return 1;
  if (a == null) return -1;

  return a - b;
};

export type OrderByOptions = { orderByProp: string; reverse?: boolean };

export const orderBy = (array: any[], opts: OrderByOptions) => {
  if (!Array.isArray(array)) return array;

  const { orderByProp, reverse = false } = opts;
  let sorted: any[];
  if (array.some(el => typeof el[orderByProp] === 'string')) {
    sorted = array.sort((a, b) => compareString(asString(a), asString(b)));
  } else {
    sorted = array.sort((a, b) => compareAny(a, b));
  }
  if (reverse) {
    return sorted.slice().reverse();
  }
  return sorted;
};

export type FilterByOptions = { filterByTerm: string; filterMaxDepth?: number };

const filterObject = (val: any, opts: FilterByOptions): boolean => {
  const { filterByTerm, filterMaxDepth = 2 } = opts;
  if (typeof val === 'string') {
    return val.toLocaleLowerCase().startsWith(filterByTerm);
  }
  if (typeof val === 'object') {
    if (filterMaxDepth < 0) return false;
    for (const value of Object.values(val)) {
      if (filterObject(value, { filterByTerm, filterMaxDepth: filterMaxDepth - 1 })) return true;
    }
    return false;
  }
  return `${val}`.toLocaleLowerCase().startsWith(filterByTerm);
};

export const filterBy = (array: any, opts: FilterByOptions) => {
  return Array.isArray(array) && opts.filterByTerm
    ? array.filter(el => filterObject(el, { ...opts, filterByTerm: opts.filterByTerm.toLocaleLowerCase() }))
    : array;
};

export const orderAndFilterBy = (array: any, opts: FilterByOptions & OrderByOptions) => orderBy(filterBy(array, opts), opts);
