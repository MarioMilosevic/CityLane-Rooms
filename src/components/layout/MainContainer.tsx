import { MainContainerProps } from "../../utils/types"

const MainContainer = ({children}:MainContainerProps) => {
  return (
    <div className="w-full">
        {children}
      </div>
  )
}

export default MainContainer
