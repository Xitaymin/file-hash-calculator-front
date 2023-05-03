export function isType<T>(keys: Array<keyof T>) {
    return function (obj: any | undefined): obj is T {
        return keys.every(k => k in obj)
    }
}