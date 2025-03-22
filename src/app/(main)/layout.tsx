import TopMenu from "@/components/TopMenu";

export default function MainTopBar({children} : {children:React.ReactNode}){
    return (
        <div>
            <TopMenu/>
            <div className="pb-[60px]"></div>
            {children}
        </div>
    )
}