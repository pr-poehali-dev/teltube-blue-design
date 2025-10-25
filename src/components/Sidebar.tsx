import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import { useEffect, useRef } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'subscriptions', label: 'Подписки', icon: 'Users' },
  { id: 'trending', label: 'Трендовое', icon: 'TrendingUp' },
  { id: 'library', label: 'Библиотека', icon: 'Folder' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'streams', label: 'Стримы', icon: 'Radio' },
];

export default function Sidebar({ activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartX.current - touchEndX.current;
      
      if (swipeDistance > 50 && isOpen) {
        onToggle();
      }
    };

    sidebar.addEventListener('touchstart', handleTouchStart);
    sidebar.addEventListener('touchmove', handleTouchMove);
    sidebar.addEventListener('touchend', handleTouchEnd);

    return () => {
      sidebar.removeEventListener('touchstart', handleTouchStart);
      sidebar.removeEventListener('touchmove', handleTouchMove);
      sidebar.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div 
        ref={sidebarRef}
        className={cn(
          "w-64 bg-card border-r border-border h-screen fixed left-0 top-16 overflow-y-auto z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
