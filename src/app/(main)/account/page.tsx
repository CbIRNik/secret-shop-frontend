'use client';

import { performLogout } from "@/features/auth/api";

export default function AccountPage() {
  const user = {
    name: "Иван Иванов",
    email: "test@example.com"
  };

  const handleLogout = async () => {
    try {
      await performLogout();
      window.location.href = '/'; // Перенаправляем на главную страницу
    } catch (error) {
      alert('Ошибка при выходе');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Мой профиль</h1>
      <div className="mt-4">
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Выйти
      </button>
    </div>
  );
}