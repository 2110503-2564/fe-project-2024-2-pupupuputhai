import TopMenu from "@/components/TopMenu";

export default function MainTopBar({children} : {children:React.ReactNode}){
    return (
        <div>
            <TopMenu/>
            {children}
        </div>
    )
}