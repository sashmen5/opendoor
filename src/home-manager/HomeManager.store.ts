import { action, computed, observable, reaction } from 'mobx';
import debounce from 'lodash/debounce';
import axios, { CancelTokenSource } from 'axios';

import { Home } from '../home/types';
import { sdk } from '../api';
import { isEmpty } from 'lodash';
import { HomeManagerUtils } from './home-manager.utils';
import { SortBy } from './types';

const CancelToken = axios.CancelToken;
let source: CancelTokenSource | undefined = undefined;

export class HomeManagerStore {
  @observable filter: string = '';
  @observable order: SortBy = 'newest';
  @observable loading: boolean = true;
  @observable private _homes: Home[] = [];

  constructor() {
    reaction(() => this.filter, this.load);
  }

  @computed
  get homes() {
    return HomeManagerUtils.orderBy(this._homes, this.order);
  }

  @action.bound
  setFilter(filter: string) {
    this.filter = filter;
  }

  @action.bound
  setOrder(order: SortBy) {
    this.order = order;
  }

  @action.bound
  async load() {
    if (isEmpty(this.filter)) {
      this._fetchHomes();
    } else {
      this.fetchHomesDebounced();
    }
  }

  fetchHomesDebounced = debounce(this._fetchHomes, 500);

  @action.bound
  private async _fetchHomes() {
    this._homes = [];
    this.loading = true;
    try {
      if (source) {
        source.cancel();
      }

      source = CancelToken.source();
      const response = await sdk
        .fetchHomes({ search: this.filter, cancelToken: source.token })
        .then(res => res.data);
      this._homes = response.results;
      source = undefined;
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
}
