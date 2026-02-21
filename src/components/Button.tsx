interface ButtonProps {
    variant:"primary"|"secondary",
    text:string,
    startIcon?:React.ReactNode,
    onclick?:()=>void,
    fullWidth?:boolean,
    loading?:boolean



}
const variantClasses={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-white"
}

const defaultStyles = "px-4 py-2 rounded md flex items-center cursor-pointer"

export function Button({variant,text,startIcon,onclick,fullWidth,loading}: ButtonProps){
   return <button onClick={onclick} disabled={loading} className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? " w-full flex justify-center items-center":""}  ${loading?"opacity-45 cursor-not-allowed pointer-events-none":""}`}>
    <div className="pr-2">{startIcon}</div>{text}</button>
}