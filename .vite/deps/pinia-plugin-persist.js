import "./chunk-SSYGV25P.js";

// node_modules/pinia-plugin-persist/dist/pinia-persist.es.js
var updateStorage = (strategy, store) => {
  const storage = strategy.storage || sessionStorage;
  const storeKey = strategy.key || store.$id;
  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {});
    storage.setItem(storeKey, JSON.stringify(partialState));
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state));
  }
};
var index = ({ options, store }) => {
  var _a, _b, _c, _d;
  if ((_a = options.persist) == null ? void 0 : _a.enabled) {
    const defaultStrat = [{
      key: store.$id,
      storage: sessionStorage
    }];
    const strategies = ((_c = (_b = options.persist) == null ? void 0 : _b.strategies) == null ? void 0 : _c.length) ? (_d = options.persist) == null ? void 0 : _d.strategies : defaultStrat;
    strategies.forEach((strategy) => {
      const storage = strategy.storage || sessionStorage;
      const storeKey = strategy.key || store.$id;
      const storageResult = storage.getItem(storeKey);
      if (storageResult) {
        store.$patch(JSON.parse(storageResult));
        updateStorage(strategy, store);
      }
    });
    store.$subscribe(() => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store);
      });
    });
  }
};
export {
  index as default,
  updateStorage
};
//# sourceMappingURL=pinia-plugin-persist.js.map
