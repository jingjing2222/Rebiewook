import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BookSearch() {
    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Input placeholder="Enter book title" className="flex-grow" />
                <Button>Search</Button>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
                <li className="p-2 hover:bg-[#F4A460] hover:bg-opacity-20 cursor-pointer rounded">
                    Example Book 1 by Author Name
                </li>
                <li className="p-2 hover:bg-[#F4A460] hover:bg-opacity-20 cursor-pointer rounded">
                    Example Book 2 by Another Author
                </li>
                <li className="p-2 hover:bg-[#F4A460] hover:bg-opacity-20 cursor-pointer rounded">
                    Example Book 3 by Yet Another Author
                </li>
            </ul>
        </div>
    );
}
