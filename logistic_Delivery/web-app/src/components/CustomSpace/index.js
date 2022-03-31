import { Children, cloneElement } from "react"

export default ({
  type,
  children,
  ...props
}) => {
  return Children.map(children, (child) => {
    const style = { ...child.props.style };
    if (type === "vertical") {
      Object.assign(style, { marginBottom: 16 })
    }
    else {
      Object.assign(style, { marginRight: 16 })
    }
    return cloneElement(child, {
      ...props,
      style
    })
  })
}