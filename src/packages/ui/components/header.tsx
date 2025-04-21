import { Button } from "../button";
import { MenuBar } from "../menu-bar";
import { Wordmark } from "../wordmark";

export function NavHeader() {
    return (
        <div className="flex justify-between items-center max-w-[1280px] mx-auto p-3 bg-trnsparent">
            <Wordmark />
            <MenuBar />
            <div>
                <Button 
                    text="Sign In"
                    variant="fancy"
                    />
            </div>
        </div>
    )
}