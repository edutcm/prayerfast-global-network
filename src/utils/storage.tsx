const storageFactory = (getStorage: any) => {
  let inMemoryStorage: any = {};

  function isSupported() {
    try {
      let testKey = "__some_random_key_you_are_not_going_to_use__";
      getStorage().setItem(testKey, testKey);
      getStorage().removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  function clear() {
    if (isSupported()) {
      getStorage().clear();
    } else {
      inMemoryStorage = {};
    }
  }
  function getItem(name: string) {
    if (isSupported()) {
      return getStorage().getItem(name);
    }
    if (inMemoryStorage.hasOwnProperty(name)) {
      return inMemoryStorage[name];
    }
    return null;
  }
  function key(index: any) {
    if (isSupported()) {
      return getStorage().key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }
  function removeItem(name: string) {
    if (isSupported()) {
      getStorage().removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }
  function setItem(name: string, value: any) {
    if (isSupported()) {
      getStorage().setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value);
    }
  }
  function length() {
    if (isSupported()) {
      return getStorage().length;
    } else {
      return Object.keys(inMemoryStorage).length;
    }
  }
  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    key: key,
    get length() {
      return length();
    },
  };
};

export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);
