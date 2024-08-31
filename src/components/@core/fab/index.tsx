"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"

export default function Fab() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="fixed left-4 bottom-4 z-50">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full shadow-lg"
                            aria-label="Open modal"
                        >
                            <PlusIcon className="h-6 w-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modal Title</DialogTitle>
                            <DialogDescription>
                                This is the content of the modal that appears when you click the floating action button.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <p>You can add any content you want here.</p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
