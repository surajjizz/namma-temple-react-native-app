import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg";
import ITypeIcon from '../../interface/ITypeIcon';
import IconDatas from './Datas';

interface IProps {
  color: string
  size: number
  name: ITypeIcon
}

const Icon = (props: IProps) => {
  return (
    <Svg
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
    >
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        // d="M328 112L184 256l144 144"
        d={IconDatas[props.name]}
      />
    </Svg>
  )
}

export default Icon;