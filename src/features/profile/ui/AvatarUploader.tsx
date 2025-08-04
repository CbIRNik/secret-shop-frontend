'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

type AvatarUploaderProps = {
  initialAvatar: string;
  onAvatarChange: (file: File) => void;
};

export const AvatarUploader = ({ initialAvatar, onAvatarChange }: AvatarUploaderProps) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть меньше 2MB');
      return;
    }

    setIsLoading(true);
    
    try {
      // Временный URL для предпросмотра
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
      onAvatarChange(file);
    } catch (error) {
      console.error('Ошибка загрузки аватара:', error);
      alert('Ошибка при загрузке изображения');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Image
          src={avatar}
          alt="User Avatar"
          width={160}
          height={160}
          className="w-40 h-40 rounded-full border-2 border-gray-200 object-cover"
          priority
        />
        <div 
          onClick={triggerFileInput}
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {isLoading ? (
            <span className="text-white">Загрузка...</span>
          ) : (
            <span className="text-white text-center px-2">Сменить фото</span>
          )}
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <button
        onClick={triggerFileInput}
        disabled={isLoading}
        className="mt-2 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
      >
        {isLoading ? 'Загрузка...' : 'Выбрать аватар'}
      </button>
    </div>
  );
};