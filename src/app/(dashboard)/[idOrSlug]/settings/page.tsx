import { Button } from "@/packages/ui/button";
import { SettingCard } from "@/packages/ui/layout/setting-card";

export default function Settings() {
    return (
      <main>
        <div className="py-5 px-2 border-b border-neutral-300 w-full">
          <h2 className="font-semibold texl-lg md:text-xl text-center md:text-start">
            General
          </h2>
        </div>
        <SettingCard
          action={
              <Button text="Save"/>
                
          }
          actionDescription="Upload an image from your local machine"
          text="acrobat"
          title="Your Name"
          description="this name will appear on onout"
        />
      </main>
    );
}