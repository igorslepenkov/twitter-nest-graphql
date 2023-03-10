export enum LocalStorageEndpoint {
  Auth = "auth",
}

class LocalStorageRepository {
  public get<Type>(key: LocalStorageEndpoint): Type | null {
    const saved = localStorage.getItem(key);

    if (!saved) return null;

    return JSON.parse(saved);
  }

  public set<Type>(key: LocalStorageEndpoint, value: Type | null): void {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  }

  public forget(key: LocalStorageEndpoint): void {
    localStorage.removeItem(key);
  }
}

export const localStorageRepository = new LocalStorageRepository();
