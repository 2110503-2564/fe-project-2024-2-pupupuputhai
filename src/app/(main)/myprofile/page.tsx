import MyProfile from "@/components/MyProfile";
import MyReservation from "@/components/MyReservation";


export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-6 mt-20">My Profile</h1>
            <div className="flex justify-between px-20 gap-8">
                <MyProfile />
                <MyReservation />
            </div>
        </>
    );
}
