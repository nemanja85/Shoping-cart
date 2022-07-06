import { useEffect, useState } from "react";

export function useLocalStorage<cart>(key: string, initialValues: cart | (() => cart)){
  const [value, setValue] = useState<cart>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValues === "function") {
      return (initialValues as () => cart)()
    } else {
      return initialValues
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}