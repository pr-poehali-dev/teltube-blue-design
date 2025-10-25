import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'subscriptions', label: 'Подписки', icon: 'Users' },
  { id: 'trending', label: 'Трендовое', icon: 'TrendingUp' },
  { id: 'library', label: 'Библиотека', icon: 'Folder' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'streams', label: 'Стримы', icon: 'Radio' },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-screen fixed left-0 top-16 overflow-y-auto">
      <div className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
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
  );
}
