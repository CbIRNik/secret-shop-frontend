'use client';
import { useState, useRef } from 'react';
import { performLogout } from "@/features/auth/api";
import Image from 'next/image';

export default function AccountPage() {
  // Состояния пользователя
  const [user, setUser] = useState({
    name: "Владимир Калташев",
    login: "vkaltashev",
    email: "vkaltashev@gmail.com",
    avatar: "/default-avatar.png",
    joinDate: "Присоединился в июне 2023",
    bio: "Frontend разработчик | Люблю React и Next.js",
    stats: {
      orders: 12,
      reviews: 5,
      wishlist: 8
    }
  });

  const [activeTab, setActiveTab] = useState('orders');
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработчик выбора аватара
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Валидация
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть меньше 2MB');
      return;
    }

    setIsAvatarLoading(true);

    try {
      // В реальном приложении здесь будет загрузка на сервер
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await uploadAvatar(formData);
      
      // Временное решение - локальный предпросмотр
      const previewUrl = URL.createObjectURL(file);
      setUser(prev => ({ ...prev, avatar: previewUrl }));
    } catch (error) {
      console.error('Ошибка загрузки аватара:', error);
      alert('Не удалось загрузить аватар');
    } finally {
      setIsAvatarLoading(false);
    }
  };

  // Обработчик выхода
  const handleLogout = async () => {
    try {
      await performLogout();
      window.location.href = '/';
    } catch (error) {
      alert('Ошибка при выходе из аккаунта');
    }
  };

  // Триггер для скрытого input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Левая колонка - профиль */}
        <div className="w-full md:w-1/4 space-y-4">
          {/* Аватар с возможностью загрузки */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full border-2 border-gray-200 object-cover"
                priority
              />
              <div 
                onClick={triggerFileInput}
                className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${
                  isAvatarLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {isAvatarLoading ? (
                  <span className="text-white">Загрузка...</span>
                ) : (
                  <span className="text-white text-center px-2">Сменить фото</span>
                )}
              </div>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
              disabled={isAvatarLoading}
            />
            
            <button
              onClick={triggerFileInput}
              disabled={isAvatarLoading}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              {isAvatarLoading ? 'Загрузка...' : 'Выбрать аватар'}
            </button>
          </div>

          {/* Информация пользователя */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">@{user.login}</p>
            <p className="text-gray-500 text-sm">{user.joinDate}</p>
            <p className="text-gray-600 mt-2">{user.bio}</p>
          </div>

          {/* Статистика */}
          <div className="flex justify-around border-t pt-4">
            <div className="text-center">
              <p className="font-bold">{user.stats.orders}</p>
              <p className="text-sm text-gray-500">Заказов</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.stats.reviews}</p>
              <p className="text-sm text-gray-500">Отзывов</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.stats.wishlist}</p>
              <p className="text-sm text-gray-500">В избранном</p>
            </div>
          </div>

          {/* Кнопка выхода */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg border border-red-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Выйти
          </button>
        </div>

        {/* Правая колонка - контент */}
        <div className="w-full md:w-3/4">
          {/* Табы */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'orders' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              История заказов
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'wishlist' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Избранное
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'reviews' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Мои отзывы
            </button>
          </div>

          {/* Содержимое табов */}
          <div className="mt-4">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <p className="font-medium">Заказ #12345</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Доставлен</span>
                  </div>
                  <p className="text-gray-600 mt-1">Дата: 15 июня 2023</p>
                  <p className="text-gray-600">Сумма: 4 990 ₽</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <p className="font-medium">Заказ #12346</p>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">В обработке</span>
                  </div>
                  <p className="text-gray-600 mt-1">Дата: 10 июня 2023</p>
                  <p className="text-gray-600">Сумма: 2 490 ₽</p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(item => (
                  <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 h-32 mb-2 rounded-lg"></div>
                    <p className="font-medium">Товар {item}</p>
                    <p className="text-gray-600">Цена: {item * 1000} ₽</p>
                    <button className="mt-2 w-full bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm">
                      В корзину
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <span className="text-yellow-400 text-lg">★★★★★</span>
                    <span className="ml-2 text-sm text-gray-500">2 дня назад</span>
                  </div>
                  <p className="font-medium mt-1">Отличный товар!</p>
                  <p className="text-gray-600 mt-1">Очень доволен покупкой, всё работает идеально. Рекомендую!</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <span className="text-yellow-400 text-lg">★★★☆☆</span>
                    <span className="ml-2 text-sm text-gray-500">1 неделю назад</span>
                  </div>
                  <p className="font-medium mt-1">Неплохо, но есть недостатки</p>
                  <p className="text-gray-600 mt-1">Качество хорошее, но дизайн мог бы быть лучше.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}