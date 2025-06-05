import ReactDOM from "react-dom"
import type { PortalProps } from "../types/models"

const Portal: React.FC<PortalProps> = ({ children, containerId }) => {
  const containerElement = containerId
    ? document.getElementById(containerId)
    : document.body

  return containerElement && ReactDOM.createPortal(children, containerElement)
}

export default Portal
