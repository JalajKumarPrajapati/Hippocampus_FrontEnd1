export function Input({placeholder,ref,type}:{placeholder:string,ref?:any,type?:string}){
    return <div>
        <input placeholder={placeholder} ref={ref} type={type} className="px-4 py-2 border rounded m-2"></input>
    </div>
}