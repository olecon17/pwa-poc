import localforage from 'localforage'
import { resolve } from 'path';

export default class CacheManager {
  writeData = (key, data) => localforage.setItem(key, data)

  readData = key => localforage.getItem(key)

  clearData = () => localforage.clear()

}
