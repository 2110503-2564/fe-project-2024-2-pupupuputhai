import TopMenu from "@/components/TopMenu";
import CreateRestaurant from "@/components/form/CreateRestaurant";
import EditRestaurant from "@/components/form/EditRestaurant";

export default function MainTopBar({children} : {children:React.ReactNode}){
    return (
        <div>
            <TopMenu/>
            <div className="h-[60px]"></div>
            {/* <EditRestaurant/> */}
            {children}
        </div>
    )
}