import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import VideoPlayer from '@/pages/VideoPlayer';
import Channel from '@/pages/Channel';
import UploadVideoDialog from '@/components/UploadVideoDialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { initGoogleAuth, loginWithGoogle, logout, saveUser, loadUser, User } from '@/lib/auth';
import AuthDialog from '@/components/AuthDialog';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const savedUser = localStorage.getItem('teltube_user');
    const savedToken = localStorage.getItem('teltube_token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleLogin = () => {
    setAuthDialogOpen(true);
  };

  const handleAuthSuccess = (user: any, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('teltube_user', JSON.stringify(user));
    localStorage.setItem('teltube_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('teltube_user');
    localStorage.removeItem('teltube_token');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'subscriptions':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Подписки</h2>
            <p className="text-muted-foreground">Здесь появятся видео каналов, на которые вы подписаны</p>
          </div>
        );
      case 'trending':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Трендовое</h2>
            <p className="text-muted-foreground">Самые популярные видео сегодня</p>
          </div>
        );
      case 'library':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Библиотека</h2>
            <p className="text-muted-foreground">Ваши сохраненные видео и плейлисты</p>
          </div>
        );
      case 'history':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">История</h2>
            <p className="text-muted-foreground">Просмотренные видео</p>
          </div>
        );
      case 'streams':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Стримы</h2>
            <p className="text-muted-foreground">Прямые трансляции</p>
          </div>
        );
      case 'video':
        return <VideoPlayer />;
      case 'channel':
        return <Channel />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="lg:ml-64 mt-16 p-6">
        <div className="max-w-[1800px] mx-auto">
          {renderContent()}
        </div>
      </main>

      {user && token && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-lg gap-2"
          onClick={() => setUploadDialogOpen(true)}
        >
          <Icon name="Upload" size={20} />
          Загрузить видео
        </Button>
      )}

      <div className="fixed bottom-6 left-6 flex gap-2 bg-card border border-border rounded-lg p-2 shadow-lg">
        <button
          onClick={() => setActiveSection('video')}
          className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Видео
        </button>
        <button
          onClick={() => setActiveSection('channel')}
          className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
        >
          Канал
        </button>
      </div>

      <UploadVideoDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        userId={user?.id || 0}
        token={token}
        onUploadSuccess={() => window.location.reload()}
      />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}