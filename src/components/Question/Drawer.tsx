// ./components/Question/Drawer.tsx

"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuestionForm from "@/components/Question/Form";

const QuestionDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Ask Question</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="wrapper mx-auto w-full max-w-3xl">
          <DrawerHeader className="text-left">
            <DrawerTitle>Ask Question</DrawerTitle>
            <DrawerDescription>What would you like to ask?</DrawerDescription>
          </DrawerHeader>
          {/* Question Form */}
          <QuestionForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionDrawer;
