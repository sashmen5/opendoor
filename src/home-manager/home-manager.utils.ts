import { Home } from '../home/types';
import { Order } from './home-manager.types';

export const HomeManagerUtils = {
  orderBy: orderBy
};

function orderBy(homes: Home[], order?: Order) {
  if (!order) {
    return homes;
  }

  const sorter = sorters[order];
  return homes.slice().sort(sorter);
}

const sorters: Record<Order, (a: Home, b: Home) => number> = {
  older: older,
  newest: newest,
  active: active,
  sold: sold
};

function older(homeA: Home, homeB: Home) {
  const dateA = new Date(homeA.createdAt).getTime();
  const dateB = new Date(homeB.createdAt).getTime();

  return dateA - dateB;
}

function newest(homeA: Home, homeB: Home) {
  const dateA = new Date(homeA.createdAt).getTime();
  const dateB = new Date(homeB.createdAt).getTime();

  return dateB - dateA;
}

function active(homeA: Home, homeB: Home) {
  if (homeA.status === 'active') return -1;
  if (homeB.status === 'active') return 1;
  return 0;
}

function sold(homeA: Home, homeB: Home) {
  if (homeA.status === 'sold') return -1;
  if (homeB.status === 'sold') return 1;
  return 0;
}
