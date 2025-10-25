import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import VideoCard from '@/components/VideoCard';

const relatedVideos = [
  {
    id: '1',
    title: 'Связанное видео: Продолжение гайда',
    channel: 'Tech Channel',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    views: '890K просмотров',
    timestamp: '1 день назад',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    duration: '9:21',
  },
  {
    id: '2',
    title: 'Лучшие советы для начинающих',
    channel: 'Digital Creator',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DC',
    views: '1.5M просмотров',
    timestamp: '3 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    duration: '14:56',
  },
];

export default function VideoPlayer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2">
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <div className="w-full h-full flex items-center justify-center text-white">
            <Icon name="Play" size={64} className="opacity-50" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">
          Как создать свой YouTube канал в 2024 году
        </h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=TC" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Tech Channel</p>
              <p className="text-sm text-muted-foreground">1.2M подписчиков</p>
            </div>
            <Button className="ml-4">Подписаться</Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="ThumbsUp" size={18} className="mr-2" />
              12K
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="ThumbsDown" size={18} />
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share2" size={18} className="mr-2" />
              Поделиться
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="bg-muted rounded-lg p-4">
          <div className="flex gap-3 mb-2">
            <span className="font-semibold">1.2M просмотров</span>
            <span className="text-muted-foreground">2 дня назад</span>
          </div>
          <p className="text-sm">
            В этом видео я расскажу о всех шагах создания успешного канала на YouTube. 
            Мы разберем настройку канала, создание контента, продвижение и монетизацию.
            <br /><br />
            Таймкоды:
            <br />0:00 - Введение
            <br />2:15 - Создание канала
            <br />5:30 - Настройка оформления
            <br />8:45 - Первое видео
          </p>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="MessageSquare" size={20} />
            Комментарии (124)
          </h3>
        </div>
      </div>

      <div className="lg:col-span-1">
        <h3 className="font-semibold mb-4">Похожие видео</h3>
        <div className="flex flex-col gap-3">
          {relatedVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}
