import BookSearch from "@/components/BookSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UploadForm() {
    return (
        <div className="space-y-6 bg-[#F4A460] bg-opacity-20 p-6 rounded-lg shadow-md">
            <BookSearch />
            <form className="space-y-6">
                <div>
                    <Label htmlFor="title">Book Title</Label>
                    <Input id="title" name="title" required />
                </div>
                <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Input id="description" name="description" required />
                </div>
                <div>
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input
                        id="publishedDate"
                        name="publishedDate"
                        type="date"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                        id="coverImage"
                        name="coverImage"
                        type="url"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="detailedReview">Detailed Review</Label>
                    <Textarea
                        id="detailedReview"
                        name="detailedReview"
                        required
                        className="h-40"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
                >
                    Upload Book Review
                </Button>
            </form>
        </div>
    );
}
