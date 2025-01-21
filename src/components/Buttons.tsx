import { Button } from "@/components/ui/button";

export function Buttons({
    classForTailwind,
    text,
}: {
    classForTailwind: string;
    text: string;
}) {
    return (
        <Button type="button" className={classForTailwind}>
            {text}
        </Button>
    );
}
