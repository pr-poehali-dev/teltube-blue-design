import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCard from '@/components/VideoCard';
import Icon from '@/components/ui/icon';

const channelVideos = [
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
    channel: 'Tech Channel',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    views: '856K просмотров',
    timestamp: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    duration: '8:45',
  },
  {
    id: '3',
    title: 'Обзор лучших камер для стриминга',
    channel: 'Tech Channel',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    views: '2.3M просмотров',
    timestamp: '2 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400',
    duration: '16:20',
  },
];

export default function Channel() {
  return (
    <div className="animate-fade-in">
      <div className="relative h-48 bg-gradient-to-r from-primary to-secondary rounded-lg mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200')] bg-cover bg-center opacity-30" />
      </div>

      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-32 h-32 border-4 border-background">
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=TC" />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Tech Channel</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <span>@techchannel</span>
            <span>•</span>
            <span>1.2M подписчиков</span>
            <span>•</span>
            <span>156 видео</span>
          </div>
          <p className="text-sm mb-4 max-w-2xl">
            Добро пожаловать на Tech Channel! Здесь вы найдете обучающие видео 
            о технологиях, гайды по видеопродакшену и многое другое.
          </p>
          <div className="flex gap-2">
            <Button>
              <Icon name="UserPlus" size={18} className="mr-2" />
              Подписаться
            </Button>
            <Button variant="outline">
              <Icon name="Bell" size={18} className="mr-2" />
              Уведомления
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger 
            value="videos" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Видео
          </TabsTrigger>
          <TabsTrigger 
            value="shorts"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Shorts
          </TabsTrigger>
          <TabsTrigger 
            value="streams"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Прямые эфиры
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            О канале
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {channelVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shorts" className="mt-6">
          <p className="text-muted-foreground text-center py-12">Shorts скоро появятся</p>
        </TabsContent>

        <TabsContent value="streams" className="mt-6">
          <p className="text-muted-foreground text-center py-12">Нет прямых эфиров</p>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="max-w-3xl">
            <h3 className="font-semibold mb-2">Описание</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tech Channel - это образовательная платформа для всех, кто интересуется 
              технологиями и видеопродакшеном. Мы делимся знаниями и опытом в создании контента.
            </p>

            <h3 className="font-semibold mb-2">Контакты</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Email: contact@techchannel.com
            </p>

            <h3 className="font-semibold mb-2">Статистика</h3>
            <p className="text-sm text-muted-foreground">
              Канал создан: 15 января 2020
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
