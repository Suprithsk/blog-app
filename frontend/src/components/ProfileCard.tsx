import { UserResponse } from "../types/types";

interface UserProps {
    user: UserResponse | null;
}
const ProfileCard = ({user}: UserProps) => {
    return (
        <div className="mt-4">
            <h1 className="text-3xl font-semibold">Profile:</h1>
            <div className="flex flex-col gap-2 bg-slate-300 p-4 rounded-md mt-3">
                <p className="text-sm">Username</p>
                <h1 className="text-lg font-semibold">{user && user.username}</h1>
                <p className="text-sm ">Email</p>
                <p className="text-lg font-semibold">{user && user.email}</p>
                <p className="text-sm">Name</p>
                <p className="text-lg font-semibold">{user && user.name}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
