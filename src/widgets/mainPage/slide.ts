import { ReactNode } from "react"

export type Slide = {
  id: string,
  titleKey: string,
  textKey?: string,
  image: string,
  interactive?: ReactNode
}