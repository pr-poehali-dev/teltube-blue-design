import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
  user: { name: string; email: string; avatar: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ onSearch, onMenuClick, user, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Icon name="Menu" size={24} />
          </Button>
          <Icon name="Play" size={32} className="text-primary" />
          <h1 className="text-2xl font-bold text-primary">TelTube</h1>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Input
              type="search"
              placeholder="Поиск видео..."
              className="w-full pr-10"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Button 
              size="icon" 
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button size="icon" variant="ghost">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 cursor-pointer" onClick={onLogout}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </>
          ) : (
            <Button onClick={onLogin} className="gap-2">
              <Icon name="LogIn" size={18} />
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}