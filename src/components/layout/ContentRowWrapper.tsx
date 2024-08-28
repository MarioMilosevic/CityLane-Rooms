import { ContentRowWrapperProps } from "../../utils/types"

const ContentRowWrapper = ({ children}:ContentRowWrapperProps) => {
  return (
    <ul className='flex flex-col gap-1'>
          { children}
    </ul>
  )
}

export default ContentRowWrapper