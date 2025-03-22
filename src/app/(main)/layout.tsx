import TopMenu from "@/components/TopMenu";

export default function MainTopBar({children} : {children:React.ReactNode}){
    return (
        <div>
            <TopMenu/>
            <div className="h-[60px]"></div>

            {children}
        </div>
    )
}