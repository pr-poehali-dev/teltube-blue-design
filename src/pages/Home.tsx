import { useState, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VIDEOS_URL = 'https://functions.poehali.dev/207ed7b1-49f0-4102-9678-274289921ab7';

const categories = ['Все', 'Обучение', 'Технологии', 'Развлечения', 'Музыка', 'Игры', 'Спорт'];

interface Video {
  id: number;
  title: string;
  channel_name: string;
  channel_avatar: string;
  views: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(VIDEOS_URL);
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M просмотров`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K просмотров`;
    return `${views} просмотров`;
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 3600) return `${Math.floor(diff / 60)} минут назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} часов назад`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} дней назад`;
    return `${Math.floor(diff / 604800)} недель назад`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 sticky top-0 bg-background z-10 py-4 border-b border-border">
        <div className="overflow-x-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">
          Загрузка видео...
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Пока нет видео. Загрузите первое видео!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id.toString()}
              title={video.title}
              channel={video.channel_name}
              channelAvatar={video.channel_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${video.channel_name}`}
              views={formatViews(video.views)}
              timestamp={formatTimestamp(video.created_at)}
              thumbnail={video.thumbnail_url || 'https://via.placeholder.com/400x225/0EA5E9/ffffff?text=TelTube'}
              duration={formatDuration(video.duration)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
