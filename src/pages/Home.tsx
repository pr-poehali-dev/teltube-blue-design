import { useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockVideos = [
  {
    id: '1',
    title: 'Как создать свой YouTube канал в 2024 году',
    channel: 'Tech Channel',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    views: '1.2M просмотров',
    timestamp: '2 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    duration: '12:34',
  },
  {
    id: '2',
    title: 'Топ 10 приложений для видеомонтажа',
    channel: 'Digital Creator',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DC',
    views: '856K просмотров',
    timestamp: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    duration: '8:45',
  },
  {
    id: '3',
    title: 'Полный гайд по стримингу на платформах',
    channel: 'Stream Master',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SM',
    views: '2.1M просмотров',
    timestamp: '3 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
    duration: '15:22',
  },
  {
    id: '4',
    title: 'Секреты успешного видеоблога',
    channel: 'Content King',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CK',
    views: '523K просмотров',
    timestamp: '5 дней назад',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
    duration: '10:11',
  },
  {
    id: '5',
    title: 'Монтаж видео для начинающих',
    channel: 'Edit Pro',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EP',
    views: '1.8M просмотров',
    timestamp: '1 день назад',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
    duration: '20:45',
  },
  {
    id: '6',
    title: 'Как набрать первую 1000 подписчиков',
    channel: 'Growth Hacker',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GH',
    views: '3.2M просмотров',
    timestamp: '2 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
    duration: '14:30',
  },
  {
    id: '7',
    title: 'Обзор камер для съемки видео в 2024',
    channel: 'Tech Reviews',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TR',
    views: '945K просмотров',
    timestamp: '4 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400',
    duration: '18:12',
  },
  {
    id: '8',
    title: 'Лучшие микрофоны для записи подкастов',
    channel: 'Audio Expert',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AE',
    views: '672K просмотров',
    timestamp: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
    duration: '11:55',
  },
];

const categories = ['Все', 'Обучение', 'Технологии', 'Развлечения', 'Музыка', 'Игры', 'Спорт'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
