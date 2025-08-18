import 'react-pageflip'

declare module 'react-pageflip' {
  interface IProps {
    width?: number
    height?: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    clickEventForward?: boolean
    className?: string
    style?: React.CSSProperties
    startPage?: number
    flippingTime?: number
    startZIndex?: number
    usePortrait?: boolean
    drawShadow?: boolean
    perspective?: number
    autoSize?: boolean
    children?: React.ReactNode
  }

  export default class HTMLFlipBook extends React.Component<IProps> {}
}
