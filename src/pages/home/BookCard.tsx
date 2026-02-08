import { Link } from "react-router";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewListDTO } from "@/pages/ReviewListPage";

export const BookCard = ({ review }: { review: ReviewListDTO }) => {
  return (
    <Link to={`/bookdetailes/${review.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/70 bg-card/95 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50">
          <img
            src={review.cover_image || `${import.meta.env.BASE_URL}image-1.png`}
            alt={`Cover of ${review.title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="shadow-sm">
              Review
            </Badge>
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground md:text-lg">{review.title}</h2>
          <p className="line-clamp-3 text-sm text-muted-foreground">{review.description}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{review.published_date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
