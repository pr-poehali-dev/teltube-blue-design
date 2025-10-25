import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UploadVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number;
  token: string;
  onUploadSuccess: () => void;
}

const UPLOAD_URL = 'https://functions.poehali.dev/4924aa8f-20f4-463b-b187-598decacf3da';
const VIDEOS_URL = 'https://functions.poehali.dev/207ed7b1-49f0-4102-9678-274289921ab7';

export default function UploadVideoDialog({ open, onOpenChange, userId, token, onUploadSuccess }: UploadVideoDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        const uploadResponse = await fetch(UPLOAD_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            file: base64,
            filename: selectedFile.name,
          }),
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || 'Ошибка загрузки видео');
        }

        const videoResponse = await fetch(VIDEOS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            action: 'create',
            user_id: userId,
            title,
            description,
            video_url: uploadData.video_url,
            thumbnail_url: uploadData.thumbnail_url,
            duration: uploadData.duration,
          }),
        });

        if (!videoResponse.ok) {
          throw new Error('Ошибка сохранения видео');
        }

        toast({
          title: 'Готово!',
          description: 'Видео успешно загружено',
        });

        setTitle('');
        setDescription('');
        setSelectedFile(null);
        setThumbnail(null);
        onUploadSuccess();
        onOpenChange(false);
      };

      reader.onerror = () => {
        throw new Error('Ошибка чтения файла');
      };
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Загрузить видео</DialogTitle>
          <DialogDescription>
            Добавьте новое видео на свой канал
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="video">Видео файл *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="video" className="cursor-pointer">
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500" />
                    <span>{selectedFile.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon name="Upload" size={40} className="mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Нажмите для выбора видео или перетащите файл сюда
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Превью (необязательно)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <label htmlFor="thumbnail" className="cursor-pointer">
                {thumbnail ? (
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-500" />
                    <span>{thumbnail.name}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Icon name="Image" size={24} className="mx-auto text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Добавить обложку
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input
              id="title"
              placeholder="Введите название видео"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о чём ваше видео..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleUpload} disabled={uploading}>
            <Icon name="Upload" size={18} className="mr-2" />
            {uploading ? 'Загрузка...' : 'Опубликовать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}