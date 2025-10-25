import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCardProps {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  timestamp: string;
  thumbnail: string;
  duration: string;
  onClick?: () => void;
}

export default function VideoCard({
  title,
  channel,
  channelAvatar,
  views,
  timestamp,
  thumbnail,
  duration,
  onClick
}: VideoCardProps) {
  return (
    <Card 
      className="overflow-hidden border-0 bg-card cursor-pointer group transition-all hover:scale-[1.02] animate-fade-in"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>
      <div className="p-3 flex gap-3">
        <Avatar className="w-9 h-9 flex-shrink-0">
          <AvatarImage src={channelAvatar} />
          <AvatarFallback>{channel[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{channel}</p>
          <p className="text-xs text-muted-foreground">
            {views} • {timestamp}
          </p>
        </div>
      </div>
    </Card>
  );
}
