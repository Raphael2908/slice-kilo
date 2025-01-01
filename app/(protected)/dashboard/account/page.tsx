import { Button } from "@/components/ui/button";
import { signOutAction } from "../../../actions";

export default function Account() {
    return (
        <div>
            <Button onClick={signOutAction}>Sign out</Button>
        </div>
    )
}