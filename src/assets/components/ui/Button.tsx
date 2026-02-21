import {type ReactElement} from 'react'
type Variant = "primary"|"secondary"
interface ButtonProps{
    variant:Variant,
    size:"sm"|"md"|"lg",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick:()=>void,
}
const variantStyles: Record<Variant, string> = {
    primary:"bg-purple-600 text-white",
    secondary:"bg-purple-300 text-purple-600"
}
const sizeStyles={
   "sm":"py-2 px-2",
   "md":"py-2 px-4",
   "lg":"py-4 px-6"
}
const defualtStyles ="rounded-md p-4 flex"
export const Button=(props:ButtonProps)=>{
 return <button className={`${variantStyles[props.variant]} ${defualtStyles} ${sizeStyles[props.size]} items-center`}>
    {props.startIcon? <div className="pr-2">{props.startIcon}</div>:null} {props.text}{props.endIcon? <div className="pl-2">{props.endIcon}</div>:null}</button>
}